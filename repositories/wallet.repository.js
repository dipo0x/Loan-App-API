const knex = require('../config/database.config')
const ApiError  = require('../error/ApiError')
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
    async createTransactionDetails(user, amount){
        const Uuid = uuidv4();
        const transactionUuid = uuidv4();
        await knex('transactions').insert({
            id: Uuid,
            transaction_id: transactionUuid,
            user_id: user.id,
            amount: amount,
            status: "successful",
        });
        const transactionInfo = await knex('transactions').where('id', Uuid).first();
        return transactionInfo
    },
    async createTransfer(user, amount, account_number, account_bank, next) {
        try{
            const userWallet = await knex("wallets").where("user_id", user.id).first()
            if(userWallet.balance < amount){
                next(ApiError.badUserRequest(`You need ${(amount - userWallet.balance)} more to complete this transaction`)) 
            }
            if(amount > 20000000){
                next(ApiError.badUserRequest("We know it's not ideal but you cannot transfer as much as 20 million naira once")) 
            }
            const recipentWallet = await knex("wallets")
                .where("account_number", account_number)
                .where("account_bank", account_bank)
                .first()
            if(!recipentWallet){
                next(ApiError.badUserRequest(`Invalid account details`)) 
            }

            const senderNewBalance =  userWallet.balance - amount
            await knex("wallets").update({ balance: senderNewBalance }).where("user_id", user.id)
            await this.createTransactionDetails(user, amount)
            const newBalance = recipentWallet.balance += amount
            await knex("wallets").update({ balance: Number((newBalance).toFixed(2)) })
                .where("account_number", account_number)
                .where("account_bank", account_bank)
            return recipentWallet
        }
        catch(err){
            next({err})
        }
    },

    async getAllTransactions(user, next) {
        try{
            const transactions = await knex("transactions").where("user_id", user.id)
            return transactions
        }
        catch(err){
            next({err})
        }
    },
    async withdrawFund(user, amount, account_number, account_bank, narration, next) {
        try{
            const flw = new Flutterwave(seeders[NodeEnv].flw_public_key, seeders[NodeEnv].flw_secret_key);
            const userWallet = await knex("wallets").where("user_id", user.id).first()
            if(userWallet.balance < amount){
                next(ApiError.badUserRequest(`You need ${(amount - userWallet.balance)} more to complete this transaction`)) 
            }
            if(amount > 20000000){
                next(ApiError.badUserRequest("We know it's not ideal but you cannot transfer as much as 20 million naira once")) 
            }
            const payload = {
                "account_bank": account_bank,
                "account_number": account_number,
                "amount": amount,
                "narration": narration || "Sent from Oladipo Lendsqr credit bank",
                "currency": "NGN",
                "reference": "ODCL-transfer-"+Date.now(),
                "debit_currency": "NGN"
            }
            const transaction = await flw.Transfer.initiate(payload)
            if (transaction.status == 'error'){  
                return {
                    "status": 400,
                    "success": false,
                    "message": transaction.message
                }
            }
            const newBalance = userWallet.balance - amount
            await knex("wallets").update({ balance: Number((newBalance).toFixed(2)) }).where("user_id", user.id);
            return {
                "status": 200,
                "success": true,
                "message": `You have successfully transferred N${amount}`
            }
        }
        catch(err){
            next({err})
        }
    }
}

module.exports = walletRepository