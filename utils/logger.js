const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'tasks.log');

const logTask = async (user_id) => {
  const logEntry = `${user_id}-task completed at-${Date.now()}\n`;
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) throw err;
  });
};

module.exports = { logTask };
