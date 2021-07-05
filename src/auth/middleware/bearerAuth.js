'use strict';

const User = require('../models/userModel');
module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization){
      return next('Missing Authorization Headers / Invalid Login');
    }
    const token = req.headers.authorization.split(' ').pop();
    const validUser = await User.authenticateToken(token);
    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (error){
    res.status(403).send('Invalid Login');
  }
};
