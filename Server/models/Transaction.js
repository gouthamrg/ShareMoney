const mongoose = require('mongoose');
const Joi = require('joi');

const Transaction = mongoose.model('Transaction', new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now()
  },
  paidBy: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      phone: {
        type: String
      }
    }),
    required: true
  },
  transactionType: {
    type: String,
    enum: ['Myself', 'Group', 'owe'],
    // required: true
  },
  amount: {
    type: Number,
    required: true,
    validate: {
      validator: function (val) {
        return val && val > 0;
      },
      message: "Amount has to be greater than zero"
    }
  },
  // operation: { //object
  //   type: String,
  // },
  description: {
    type: String,
    default: '',
  },
  paidFor: {
    type: [
      new mongoose.Schema({
        name: {
          type: String,
          required: true
        },
        phone: {
          type: String
        }
      })
    ],
    required: true
  },
  splitType: {
    type: String,
    enum: ['equally', 'ratio', 'Percentage', 'None'],
    // validate: {
    //   validator: function(val){
    //     if ( this.transactionType === "Myself" ) return this.required 
    //   }
    // }
  }
}));

module.exports.Transaction = Transaction;

// function validate(obj) {
//   const schema = {
//     date: Joi.date(),
//     // paidBy: Joi.obj
//   }
// }

// Type: ‘Personal’ or Group or Owe / Owed
// Amount
// Operation: Personal { Credit / Debit }, .. => Object
// Description
// Category: object
// Group: Object
// PaidFor: Users[]
// SplitType: object
