const express = require('express');
const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

const server = express();

//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`)
  next();
};

server.use(logger);

server.use('/api/users', userRouter);

server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!!</h2>`)
});

module.exports = server;
