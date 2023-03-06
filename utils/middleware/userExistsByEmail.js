const userRepository = require('../../repositories/user.repository')
const ApiError = require('../../error/ApiError')

const userMiddleware = {
    async userExists (req, res, next) {
        try{
            let { name, email, username } = req.body
            const response = await userRepository.findUser(name, email, username, next)
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
}

module.exports = userMiddleware