const Redis = require('ioredis');
const { getRedisClient } = require('../config/redis');

const rateLimiter = async (req, res, next) => {
  const { user_id } = req.body;
  if (!user_id) {
    return next();
  }

  const redisClient = getRedisClient();
  const currentTime = Date.now();
  const minuteKey = `rateLimit:${user_id}:${Math.floor(currentTime / 60000)}`;
  const secondKey = `rateLimit:${user_id}:${Math.floor(currentTime / 1000)}`;

  const minuteCount = await redisClient.get(minuteKey);
  if (minuteCount && minuteCount >= 20) {
    return res.status(429).json({ error: 'Rate limit exceeded for this minute' });
  }

  const secondCount = await redisClient.get(secondKey);
  if (secondCount && secondCount >= 1) {
    return res.status(429).json({ error: 'Rate limit exceeded for this second' });
  }

  await redisClient.incr(minuteKey);
  await redisClient.expire(minuteKey, 60);
  await redisClient.incr(secondKey);
  await redisClient.expire(secondKey, 1);

  next();
};

module.exports = rateLimiter;
