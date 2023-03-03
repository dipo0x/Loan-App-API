const bcryptjs = require('bcryptjs')
const seeders = require('../config/seeders.config');
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
        const user = createUser(username, email, newPassword);
        const accessToken = jwt.sign({_id: user._id}, seeders[NodeEnv].jwt_access_token_secret, { expiresIn: seeders[NodeEnv].jwt_expiry_time  })
        return Response.send(
          res,
          200,
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