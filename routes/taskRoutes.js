const express = require('express');
const router = express.Router();
const rateLimiter = require('../middlewares/rateLimiter');
const { handleTask } = require('../controllers/taskController');

router.post('/task', rateLimiter, handleTask);

module.exports = router;
