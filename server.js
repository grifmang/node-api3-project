const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();
const userRouter = require('./users/userRouter');
const postsRouter = require('./posts/postRouter');

server.use(express.json());
// server.use(helmet());
// server.use(morgan('tiny'));
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
server.use('/api/users', userRouter);
server.use('/api/posts', postsRouter);

function logger(req, res, next) {
  const { method, originalUrl } = req;
  console.log(`${method} to ${originalUrl} at ${Date.now()}`);

  next();
  }

module.exports = server;
