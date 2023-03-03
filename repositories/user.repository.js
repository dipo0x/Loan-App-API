const User = require('../models/user.model')

exports.findUser = async function (email, username) {
    try{
        let response = []
        const emailUser = await User.findOne({email: email})
        const usernameUser = await User.findOne({username: username})
        if(emailUser){
          response.info = ['Email already exist']
          return response
        }
        if(usernameUser){
            response.info = ['Username already exist']
            return response
        }
    }
    catch(err){
        next({err})
    }
}

exports.createUser = function (username, email, password) {
    try{
      const user = new User();
      user.username = username
      user.email = email
      user.password = password
      user.save()
      return user
    }
    catch(err){
      next({err})
    }
}