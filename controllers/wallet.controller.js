const ApiError  = require('../error/ApiError')
const validator = require('../utils/validator')
const walletRepository = require('../repositories/wallet.repository')

exports.fundAccount = async function(req, res, next){
    try{
        let { amount, pin, currency } = req.body
        if(!req.body.card){
            next(ApiError.badUserRequest("Input your card details"))
        }
        let { card_number, cvv, expiry_month, expiry_year } = req.body.card
        card_number = card_number.trim()
        cvv = cvv.trim()
        expiry_month = expiry_month.trim()
        expiry_year  = expiry_year.trim()
        currency = currency.trim()
        pin = pin.trim()
        const { errors, valid } = validator.chargeCard(card_number, cvv, expiry_month, expiry_year, currency, pin);  
        if(!valid){
            next(ApiError.badUserRequest(errors.error))
        }
        const { transaction, newBalance } = await walletRepository.chargeUserCard(req.user, req.body.card, amount, currency, pin, next)
        if(transaction.status !== "success"){
            next(ApiError.badRequest(transaction.info)) 
        }
        const transactionDetails = await walletRepository.createTransactionDetails(req.user, transaction.data.amount)
        res.status(200).send({
            "success": true,
            "message": `Funds topup successful. New balance is ${newBalance.toFixed(2)}`,
            "data": transactionDetails
        })

    }
    catch(err){
        next({err})
    }
}

exports.transferFund = async function(req, res, next){
    let { amount, account_number, account_bank } = req.body
    const transferDetails = await walletRepository.createTransfer(req.user, amount, account_number, account_bank, next)
    try{
        res.status(200).send({
            "success": true,
            "message": `You have successfully sent N${amount} to ${transferDetails.account_name}`,
        })
    }
    catch(err){
        next({err})
    }
}

exports.getTransactions = async function(req, res, next){
    const allTransactions = await walletRepository.getAllTransactions(req.user, next)
    try{
        res.status(200).send({
            "success": true,
            "message": allTransactions,
        })
    }
    catch(err){
        next({err})
    }
}

exports.withdrawFund = async function(req, res, next){
    let { amount, account_number, account_bank, narration } = req.body
    const withdrawFundResponse = await walletRepository.withdrawFund(req.user, amount, account_number, account_bank, narration, next)
    try{
        res.status(withdrawFundResponse.status).send({
            "success": withdrawFundResponse.success,
            "message": withdrawFundResponse.message,
        })
    }
    catch(err){
        next({err})
    }
}