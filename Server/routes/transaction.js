// const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");
const { Transaction } = require("./../models/Transaction");
const { User } = require("./../models/User");
const auth = require("./../middlewares/auth");

/**
 *  Save a transaction
 */
router.post("/save", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(403).send("bad Request");

  const paidByUser = await User.findOne({ _id: req.body.paidBy });
  if (!paidByUser)
    return res.status(403).send("Paid By user selected is not a valid User");

  const paidForUsers = await User.find({
    _id: {
      $in: req.body.paidFor
    }
  });
  if (!paidForUsers)
    return res.status(403).send("One or manyPaid For user are not valid");

  let transaction = new Transaction({
    date: req.body.date,
    paidBy: _.pick(paidByUser, ["_id", "name", "phone"]),
    paidFor: _.map(paidForUsers, user => {
      return { _id: user._id, name: user.name, phone: user.phone };
    }),
    amount: req.body.amount,
    description: req.body.description,
    splitType: req.body.splitType
  });

  transaction = await transaction.save();
  res.send(transaction);
});

// Paid By Me queries

/**
 *  Router for transactions paid For myself
 */
router.get("/me", auth, async (req, res) => {
  const transactions = await Transaction.find({
    "paidBy._id": { $eq: req.user._id },
    "paidFor._id": { $eq: req.user._id }
  });
  if (!transactions) return res.status(403).send("No Transactions");

  res.send(transactions);
});

/**
 * Router for transactions paid by me to others not myself
 */
router.get("/paidByMe", auth, async (req, res) => {
  const transactions = await Transaction.find({
    "paidBy._id": { $eq: req.user._id },
    "paidFor._id": { $ne: req.user._id }
  });
  if (!transactions) return res.status(403).send("No Transactions");

  res.send(transactions);
});

/**
 * Router for transactions paid by me to Specific User
 * req.body.toUserId : Paidforuser
 */
router.get("/paidByMeToUser", auth, async (req, res) => {
  const { error } = validatePaidByMeToUser(req.body);
  if (error) return res.status(403).send(error.details[0].message);

  const transactions = await Transaction.find({
    $and: [
      { "paidBy._id": { $eq: req.user._id } },
      { "paidFor._id": { $eq: req.body.toUserId } }
    ]
  });
  if (!transactions) return res.status(403).send("No Transactions");

  res.send(transactions);
});

/**
 * Router for transactions paid by me to selected Users
 * req.body.toUserIds : Paid for many users
 */
router.get("/paidByMeToUsers", auth, async (req, res) => {
  const { error } = validatePaidByMeToUsers(req.body);
  if (error) return res.status(403).send(error.details[0].message);

  const transactions = await Transaction.find({
    $and: [
      { "paidBy._id": { $eq: req.user._id } },
      { "paidFor._id": { $in: req.body.toUserIds } }
    ]
  });
  if (!transactions) return res.status(403).send("No Transactions");

  res.send(transactions);
});

// Paid For me Queries

/**
 *  Router paid for me not myself
 */
router.get("/paidForMe", auth, async (req, res) => {
  const transactions = await Transaction.find({
    $and: [
      { "paidBy._id": { $ne: { _id: req.user._id } } },
      { "paidFor._id": { $eq: { _id: req.user._id } } }
    ]
  });
  res.send(transactions);
});

/**
 *  Router paid for me by users
 */
router.get("/paidForMeByUsers", auth, async (req, res) => {
  const transactions = await Transaction.find({
    $and: [
      { "paidBy._id": { $ne: { _id: req.user._id } } },
      { "paidBy._id": { $in: req.body.byUserIds } },
      { "paidFor._id": { $eq: { _id: req.user._id } } }
    ]
  });
  res.send(transactions);
});

// Edit A TRANSACTION

// Get the due Amount to all
router.get("/getDueAmount", auth, async (req, res) => {
  let transactions = await Transaction.find({
    $or: [
      { "paidBy._id": { $eq: { _id: req.user._id } } },
      { "paidFor._id": { $eq: { _id: req.user._id } } }
    ]
  });

  let users = [];
  let totalAmount = 0;
  // Removing the transactions which is paid for oneself alone
  transactions = transactions.filter(t => {
    return !(
      t.paidBy._id == req.user._id &&
      t.paidFor.length == 1 &&
      t.paidFor[0]._id == req.user._id
    );
  });

  transactions.map(t => {
    // paidFor or paidBy
    let amt = 0;
    if (t.paidBy._id == req.user._id) {
      t.paidFor.map(p => {
        amt = calculateAmtBySplitType(t);
        users = addPaidForUser(users, p, amt);
        totalAmount += amt;
      });
    }
    else {
      amt = calculateAmtBySplitType(t);
      users = addPaidForUser(users, t.paidBy, (amt - (2 * amt)));
      totalAmount -= amt;
    }
  });
  res.send({ users: users, totalAmount: totalAmount });
});

function calculateAmtBySplitType(t) {
  if (t.splitType == 'equally') {
    return t.amount / t.paidFor.length;
  }
  else if (t.splitType == 'ratio') { }
  else if (t.splitType == 'percentage') { }
  else { }
}

function addPaidForUser(users, user, amt) {
  let ind = users.findIndex(u => u.user._id.toString() == user._id.toString());
  if (ind !== -1) {
    users[ind].amount += amt;
  } else {
    users.push({
      amount: amt,
      user: user
    });
  }
  return users;
}

function validate(obj) {
  const schema = {
    date: Joi.date(),
    paidBy: Joi.string().required(),
    transactionType: Joi.string()
      .valid("Myself", "Group", "owe")
      .required(),
    amount: Joi.number().required(),
    description: Joi.string(),
    paidFor: Joi.array().required(),
    splitType: Joi.string().required()
  };

  return Joi.validate(obj, schema);
}

function validatePaidByMeToUser(obj) {
  const schema = {
    toUserId: Joi.objectId().required()
  };
  return Joi.validate(obj, schema);
}

function validatePaidByMeToUsers(obj) {
  const schema = {
    toUserIds: Joi.array()
      .items(Joi.objectId())
      .required()
  };
  return Joi.validate(obj, schema);
}

module.exports = router;
