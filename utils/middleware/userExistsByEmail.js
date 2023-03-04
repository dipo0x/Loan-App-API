const { findUser } = require('../../repositories/user.repository')
const ApiError = require('../../error/ApiError')

module.exports.userExists = async function(req, res, next) {
  try{
    let { name, email, username } = req.body

    const response = await findUser(name, email, username, next)
    if(response.info){
      next(ApiError.badUserRequest(response.info)) 
    }
    else{
      next();
    }
  }
  catch(err){
  	next({err})
  }
}