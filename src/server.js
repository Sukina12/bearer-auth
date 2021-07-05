'use strict';

const express = require('express');
const cors = require ('cors');
const morgan = require ('morgan');

const router = require('./auth/router');
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(router);
app.use(express.urlencoded({extended:true}));
app.get('/', (req, res) => {
  res.status(200).send ('Hello From Sukina Class 7 !');
});
app.use('*',notFoundHandler);
app.use(errorHandler);

function start (port){
  app.listen(port, () => {
    console.log (`App is listening on the port ${port}`);
  });
}

module.exports = {
  app : app,
  start : start,  
};

