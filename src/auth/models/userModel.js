'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET || 'super-secret-token';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  password: { type: String, required: true },
});

userSchema.virtual('token').get(function () {
  let tokenObj = {
    username: this.username,
  };
  return jwt.sign(tokenObj,secret);
});

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});
userSchema.statics.authenticateBasic = async function (username, password) {

  const user = await this.findOne({ username });
  const isValid = await bcrypt.compare(password, user.password);
  if (isValid) {
    return user;
  } else {
    throw new Error('Invalid User !');
  }

};
userSchema.statics.authenticateWithToken = async function (token) {
  try {
    const payload = jwt.verify(token, secret);
    const user = await this.findOne({
      username: payload.username,
    });
    if (user) {
      return user;
    } else {
      throw new Error('Invalid Token Username');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const User = mongoose.model('users', userSchema);
module.exports = User;
