const { getRedisClient } = require('../config/redis');
const { task } = require('../controllers/taskController');
const queueManager = require('../utils/queueManager');

const processQueue = async () => {
  const redisClient = getRedisClient();
  const keys = await redisClient.keys('taskQueue:*');

  for (const key of keys) {
    const taskQueue = await redisClient.lrange(key, 0, -1);
    for (const item of taskQueue) {
      const { user_id } = JSON.parse(item);
      await task(user_id);
      await redisClient.lrem(key, 1, item);
    }
  }

  setTimeout(processQueue, 1000); 
};

processQueue();

module.exports = { processQueue };
