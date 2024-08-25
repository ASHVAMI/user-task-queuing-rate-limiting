const express = require('express');
const app = express();
const { initRedis } = require('./redis');

initRedis();

app.use(express.json());
app.use('/api/v1', require('../routes/taskRoutes'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
