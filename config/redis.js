const Redis = require('ioredis');
let redisClient;

const initRedis = () => {
  redisClient = new Redis({
    host: 'localhost',
    port: 6379
  });
};

const getRedisClient = () => redisClient;

module.exports = { initRedis, getRedisClient };
