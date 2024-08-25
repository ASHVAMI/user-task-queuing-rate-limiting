const { getRedisClient } = require('../config/redis');
const logger = require('../utils/logger');

const task = async (user_id) => {
  console.log(`${user_id}-task completed at-${Date.now()}`);
  await logger.logTask(user_id);
};

const handleTask = async (req, res) => {
  const { user_id } = req.body;
  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const redisClient = getRedisClient();
  await redisClient.lpush(`taskQueue:${user_id}`, JSON.stringify(req.body));
  res.status(202).json({ message: 'Task queued successfully' });
};

module.exports = { handleTask, task };
