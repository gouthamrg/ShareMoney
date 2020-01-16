const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  phone: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  hash: {
    type: String
  }
});

userSchema.methods.generateAuthToken = function () {
  console.log(config.get('jwtPrivateKey'));
  const token = jwt.sign({ _id: this.id }, config.get('jwtPrivateKey'));
  return token;
};

const User = mongoose.model('User', userSchema);

function validate(req) {
  const schema = {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().required()
  };

  return Joi.validate(req.body, schema);
}

module.exports.User = User;
module.exports.userSchema = userSchema;
module.exports.validate = validate;