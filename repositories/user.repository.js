const knex = require('../config/database')
const { account_number } = require('../services/calculations')
const { v4: uuidv4 } = require('uuid');

exports.findUser = async function (user_name, user_email, user_username, next) {
    try{
        let response = []
        const nameUser = await knex('users').where('name', user_name).first()
        const emailUser = await knex('users').where('email', user_email).first() 
        const usernameUser = await knex('users').where('username', user_username).first()
        if(nameUser){
            response.info = ['Name already exist']
        }
        if(emailUser){
          response.info = ['Email already exist']
        }
        if(usernameUser){
            response.info = ['Username already exist']
        }
        return response
    }
    catch(err){
        next({err})
    }
}

exports.createUser = async function (name, username, email, password, next) {
    try{
        const newUserUuid = uuidv4();
        const newwalletUuid = uuidv4();
        const accNumber = account_number()

        await knex('users').insert({
            id: newUserUuid,
            name: name,
            username: username,
            email: email,
            password: password
        });
        const newUser = await knex('users').where('id', newUserUuid).first();
        while (true) {            
            const existingAccNoUser = await knex('wallets').where('account_number', accNumber).first();
            if(!existingAccNoUser){
                await knex('wallets').insert({
                    id: newwalletUuid,
                    user_id: newUser.id,
                    account_number: accNumber,
                    account_name: name,
                    account_bank: "Lendsqr Credit Bank",
                    balance: 0,
                });
                const newWallet = await knex('wallets').where('id', newwalletUuid).first();
                return { 
                    newUser, newWallet
                }
            }
        } 
    }
    catch(err){
      next({err})
    }
}