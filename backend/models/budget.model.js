const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const budget = new Schema({
    userId: {type : String , require:true },
    amount: { type: Number, required: true }
  }, {
  timestamps: true,
});

const Budget = mongoose.model('Budget', budget);

module.exports = Budget;