const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const { sendMail } = require('./../utils/sendEmail');

const { User, validate } = require('./../models/User');
const auth = require('./../middlewares/auth');

// register
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
  const users = await User.findOne({ _id: req.user._id });
  res.send(_.pick(users, ['name', 'email', 'phone']));
});

router.get('/verify/:id', auth, async (req, res) => {

  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(403).send('Bad gateway');

  if (req.params.id === user.hash) {
    await User.update({ _id: req.user._id }, {
      $unset: {
        hash: 1
      }
    });
    return res.send('Verification Completed!');
  }

  return res.status(500).send(user);
});

router.post('/sendEmailVerification', auth, async (req, res) => {
  const hashToken = hash.update(req.user._id, 'utf8').digest('hex');
  const user = await User.findOneAndUpdate({ _id: req.user._id }, {
    $set: { hash: hashToken }
  }, { new: true });

  if (!user) return res.status(403).send('Bad Request');

  const link = "http://" + req.get('host') + "/verify/" + hashToken;
  const mailOptions = {
    to: user.email,
    subject: "Please confirm your Email account",
    html: `
        Hey ${user.name},
        <h3>ShareMoney App Email Verification</h3>
        <p> 
          <br />
          <a href="${link}">Click here to verify</a>
        </p>`
  };
  const result = await sendMail(mailOptions);
  res.send(result);
});

module.exports = router;