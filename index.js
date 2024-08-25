const cluster = require('cluster');
const http = require('http');
const os = require('os');
const express = require('express');
const { initRedis } = require('./config/redis');
const app = express();


initRedis();

app.use(express.json());
app.use('/api/v1', require('./routes/taskRoutes'));

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const server = http.createServer(app);
  server.listen(3000, () => {
    console.log(`Worker ${process.pid} started`);
  });
}
