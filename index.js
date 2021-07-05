'use strict';

const mongoose = require('mongoose');
const server = require('./src/server');

require('dotenv').config();
const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => {
  server.start(port);
}).catch(error => {
  console.error(error.message);
});
