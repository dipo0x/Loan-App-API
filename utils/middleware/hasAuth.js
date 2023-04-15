const jwt = require('jsonwebtoken');
const knex = require('./../../config/database.config');
const ApiError = require('./../../error/ApiError');
const seeders = require('./../../config/seeders.config');
const NodeEnv = process.env.NODE_ENV;

module.exports = async function (req, res, next) {
  try {
    if (!req.headers.authorization) {
      next(ApiError.badRequest('No Authorization'));
    } else {
      const token = req.headers.authorization.split(' ')[1];
      if (!req.headers.authorization.startsWith('Bearer')) {
        next(ApiError.badRequest('Invalid Authorization'));
      } else {
        jwt.verify(token, seeders[NodeEnv].jwt_access_token_secret, async (err, user) => {
          if (err) {
            next(ApiError.badUserRequest('Login to continue'));
          } else {
            req.user = await knex('users').where('id', user._id).first();
            next();
          }
        });
      }
    }
  } catch (err) {
    next({ err });
  }
};
