const bcrypt = require('bcryptjs');
const seeders = require('../config/seeders.config');
const jwt = require('jsonwebtoken')
const ApiError  = require('../error/ApiError')
const knex = require('../config/database.config')
const RedisCache = require('../repositories/redis.repository')
const validator = require('../utils/validator')
const userRepository = require('../repositories/user.repository')

const NodeEnv = process.env.NODE_ENV

module.exports.register = async function(req, res, next) {
    try{
      let { name, username, email, password } = req.body
      name = name.trim()
      username = username.trim()
      email = email.trim()
      password = password.trim()
      const newPassword = await bcrypt.hash(password, 10)
      const { errors, valid } = validator.signup(name, username, email, password);  
      if(!valid){
        next(ApiError.badUserRequest(errors.error))
      }
      else{
        const user = await userRepository.createUser(name, username, email, newPassword, next);
        await RedisCache.createUserInfoRedisCache(user.newUser.id, user)
        const accessToken = jwt.sign({_id: user.newUser.id}, seeders[NodeEnv].jwt_access_token_secret, { expiresIn: seeders[NodeEnv].jwt_expiry_time  })
        return res.status(200).json(
          { 
              success: true,
              token: accessToken,
              message: user
          }
        )
      }   
    }
    catch(err){
      console.log(err)
      next({err})
    }
}

module.exports.login = async function(req, res, next) {
    try{
        let { email, password } = req.body
        email = email.trim()
        password = password.trim()

        const user = await knex('users').where('email', email).first();
        if(!user){
            return next(ApiError.badUserRequest("User with this email not found"))
        }
        const accessToken = jwt.sign({_id: user.id}, seeders[NodeEnv].jwt_access_token_secret, { expiresIn: seeders[NodeEnv].jwt_expiry_time })
        const match = await bcrypt.compare(password, user.password);
        if(match == true){
            const user_details = await RedisCache.getRedisKey(user.id, next)
            if(user_details){
                return res.status(200).send({
                    "success": true,
                    "token": accessToken,
                    "data": user_details
                }) 
            }
            const user_wallet = await knex('wallets').where('user_id', user.id).first();
            await RedisCache.createUserInfoRedisCache(user.id, { user, user_wallet }, next)
            
            return res.status(200).send({
                "success": true,
                "token": accessToken,
                "data": {
                    user, user_wallet
                }
            })
        }
        next(ApiError.badUserRequest("Incorrect password"))
    }   
    catch(err){
      next({err})
    }
  }