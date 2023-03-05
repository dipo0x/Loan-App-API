const knex = require('../config/database.config')
const ApiError  = require('../error/ApiError')
const validator = require('../utils/validator')

module.exports.addCard = async function(req, res, next) {
    try{
      let { card_number, cvv, expiry_month, expiry_year, pin } = req.body
      card_number = card_number.trim()
      cvv = cvv.trim()
      expiry_month = expiry_month.trim()
      expiry_year  = expiry_year.trim()
      pin = pin.trim()

      const { errors, valid } = validator.createCard(card_number, cvv, expiry_month, expiry_year, pin);  
      if(!valid){
        next(ApiError.badUserRequest(errors.error))
      }

      else{
        await knex("cards").update(req.body).where("user_id", req.user.id);
        const card = await knex('cards').where('user_id', req.user.id).first();
        return res.status(200).json(
          { 
              success: true,
              card: card
          }
        )
      }   
    }
    catch(err){
      next({err})
    }
}