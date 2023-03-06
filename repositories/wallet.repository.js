const knex = require('../config/database.config')
const seeders = require('../config/seeders.config');
const calculations = require('../helpers/calculations')
const { v4: uuidv4 } = require('uuid');
const Flutterwave = require('flutterwave-node-v3');
const NodeEnv = process.env.NODE_ENV

const walletRepository = {
    async chargeUserCard(user, card, amount, currency, pin, next){
        const userWallet = await knex("wallets").where("user_id", user.id).first()
        const flw = new Flutterwave(seeders[NodeEnv].flw_public_key, seeders[NodeEnv].flw_secret_key);
        const payload = {
            card_number: card.card_number,
            cvv: card.cvv,
            expiry_month: card.expiry_month,
            expiry_year: card.expiry_year,
            currency: currency,
            amount: amount,
            email: user.email,
            fullname: user.name,
            tx_ref: calculations.tx_ref(),
            enckey: seeders[NodeEnv].flw_encryption_key,
            authorization: {
                mode: "pin",
                pin: pin,
            }
        }
        try{
            const transaction = await flw.Charge.card(payload)
            if (transaction.status == 'error'){      
                return transaction
            }
            const transactionId = transaction.data.id;
            const transactionVerification = await flw.Transaction.verify({ id: transactionId });
            await knex("cards").update({ card_token: transactionVerification.data.card.token }).where("user_id", user.id);
            const newBalance = amount += userWallet.balance
            await knex("wallets").update({ balance: Number((newBalance).toFixed(2)) }).where("user_id", user.id);
            return { transaction, newBalance }
        }
        catch(err){
            next({err})
        }     
    },
    async createTransactionDetails(user, transaction){
        const Uuid = uuidv4();
        const transactionUuid = uuidv4();
        await knex('transactions').insert({
            id: Uuid,
            transaction_id: transactionUuid,
            user_id: user.id,
            amount: transaction.data.amount,
            status: "successful",
        });
        const transactionInfo = await knex('transactions').where('id', Uuid).first();
        return transactionInfo
    }
}

module.exports = walletRepository