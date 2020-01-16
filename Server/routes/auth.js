const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const _ = require('lodash');

const { User } = require('./../models/User');

router.post('/', async (req, res) => {
  const { error } = validate(req);
  if (error) return res.status(403).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(403).send("Invalid email or password");

  const result = await bcrypt.compare(req.body.password, user.password);
  if (!result) return res.status(403).send('Invalid email or password');

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['name']));
});

function validate(req) {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required()
  };
  return Joi.validate(req.body, schema);
}

module.exports = router;