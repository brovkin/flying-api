const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config.json');

const authentication = async (userParams) => {
  const user = await User.findOne({ login: userParams.login });
  if (user && bcrypt.compareSync(userParams.password, user.password)) {
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '3600s' });

    return {
      ...user.toJSON(),
      token,
    }
  }
}

// create user
const create = async (userParams) => {
  // validate check user if he's exist
  if (await User.findOne({ login: userParams.login})) {
    throw 'user is exist';
  }

  const user = new User(userParams);

  // hash password
  if (userParams.password) {
    user.password = bcrypt.hashSync(userParams.password, 10);
  }

  // save user
  await user.save();
}

const getById = async (id) => await User.findById(id);

module.exports = {
  create,
  authentication,
  getById
}



