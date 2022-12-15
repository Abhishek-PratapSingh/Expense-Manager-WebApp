const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expense = new Schema({
    userId: {type : String , require:true },
    obj : [{
      ctg: {type : String },
      val: { type: Number }
     }]
  }, {
  timestamps: true,
});

const Expense = mongoose.model('Expense', expense);

module.exports = Expense;