const Redis = require('ioredis');
const { getRedisClient } = require('../config/redis');

const addToQueue = async (user_id, taskData) => {
  const redisClient = getRedisClient();
  await redisClient.lpush(`taskQueue:${user_id}`, JSON.stringify(taskData));
};

module.exports = { addToQueue };
