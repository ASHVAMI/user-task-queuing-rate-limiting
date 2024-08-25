
const { getRedisClient } = require('../config/redis');

class TaskModel {
  constructor() {
    this.redisClient = getRedisClient();
  }

  async addTaskToQueue(user_id, taskData) {
    
    await this.redisClient.lpush(`taskQueue:${user_id}`, JSON.stringify(taskData));
  }

  async getTasksFromQueue(user_id) {
   
    const tasks = await this.redisClient.lrange(`taskQueue:${user_id}`, 0, -1);
    return tasks.map(task => JSON.parse(task));
  }

  async removeTaskFromQueue(user_id, taskData) {
   
    await this.redisClient.lrem(`taskQueue:${user_id}`, 1, JSON.stringify(taskData));
  }

  async clearQueue(user_id) {
  
    await this.redisClient.del(`taskQueue:${user_id}`);
  }
}

module.exports = new TaskModel();
