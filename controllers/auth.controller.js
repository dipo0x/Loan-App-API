const bcryptjs = require('bcryptjs');
const seeders = require('../config/seeders.config');
const jwt = require('jsonwebtoken')
const { signup } = require('../utils/validator')
const { createUser } = require('../repositories/user.repository')

const NodeEnv = process.env.NODE_ENV

module.exports.register = async function(req, res, next) {
    try{
      let { username, email, password } = req.body
      username = username.trim()
      email = email.trim()
      password = password.trim()
      const newPassword = await bcryptjs.hash(password, 10)
      const { errors, valid } = signup(username, email, password);  
      if(!valid){
        next(ApiError.badUserRequest(errors.error))
      }
      else{
        const user = await createUser(username, email, newPassword, next);
        const accessToken = jwt.sign({_id: user.id}, seeders[NodeEnv].jwt_access_token_secret, { expiresIn: seeders[NodeEnv].jwt_expiry_time  })
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
      next({err})
    }
  }