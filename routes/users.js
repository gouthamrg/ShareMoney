const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const { User, validate } = require('./../models/User');
const auth = require('./../middlewares/auth');

//register
router.post('/register', async (req, res) => {
  const { error } = validate(req);
  if (error) return res.status(403).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(403).send("user is already registered");

  user = new User(_.pick(req.body, ['name', 'email', 'password', 'phone']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  res.send(_.pick(user, ['name', 'email']));
});

router.get('/', auth, async (req, res) => {
  const users = await User
    .find()
    .sort({ name: 1 })
    .select({ name: 1, email: 1, phone: 1 });
  res.send(users);
});

router.get('/me', auth, async (req, res) => {
  console.log(req.user);
  const users = await User.findOne({ _id: req.user._id });
  res.send(_.pick(users, ['name', 'email', 'phone']));
  // res.send(users);
});

module.exports = router;