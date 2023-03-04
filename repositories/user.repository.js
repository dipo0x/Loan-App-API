const knex = require('../config/database')
const { v4: uuidv4 } = require('uuid');

exports.findUser = async function (user_email, user_username, next) {
    try{
        let response = []
        const emailUser = await knex('users').where('email', user_email).first() 
        const usernameUser = await knex('users').where('username', user_username).first()
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

exports.createUser = async function (username, email, password, next) {
    try{
        const randomUuid = uuidv4();
        await knex('users').insert({
            id: randomUuid,
            username: username,
            email: email,
            password: password
        });
        const newUser = await knex('users').where('id', randomUuid).first();
        return newUser
    }
    catch(err){
      next({err})
    }
}