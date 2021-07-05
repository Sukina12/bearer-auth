'use strict';

const express = require ('express');
let router = express.Router();

const basicAuth = require ('./middleware/basicAuth');
const bearerAuth = require ('./middleware/bearerAuth');
const User = require ('./models/userModel');
const { request } = require('express');

router.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);
});

router.post('/signup', async (req, res, next) => {
  try {
    let user = new User(req.body);
    const userRecord = await user.save();
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

router.get ('/users', bearerAuth, async (req,res,next) => {
  const user = await User.find({});
  const list = user.map (user => user.username);
  res.status(200).json(list);
});

router.get('/secret', bearerAuth, async (req,res,next) => {
  res.status(200).send ('Welcome To The Secret Area !');
});

module.exports = router;
