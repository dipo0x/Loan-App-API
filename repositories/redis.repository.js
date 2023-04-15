const client = require('../config/redis.config');
const seeders = require('../config/seeders.config');

const NodeEnv = process.env.NODE_ENV;

const REDIS_EXPIRATION_TIME = seeders[NodeEnv].redis_expiration_time;

const RedisCache = {
  async createUserInfoRedisCache(userID, userDetails, next) {
    try {
      await client.set(userID, JSON.stringify(userDetails));
      client.expire(userID, REDIS_EXPIRATION_TIME);
    } catch (err) {
      next({ err });
    }
  },
  async deleteRedisKey(redisKey, next) {
    try {
      await client.del(redisKey);
    } catch (err) {
      next({ err });
    }
  },
  async getRedisKey(redisKey, next) {
    try {
      let otpData = await client.get(redisKey);
      if (otpData) {
        otpData = JSON.parse(otpData);
        return otpData;
      }
      return null;
    } catch (err) {
      next({ err });
    }
  },
};

module.exports = RedisCache;
