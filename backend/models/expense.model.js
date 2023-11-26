const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expense = new Schema({
    userId: {type : String , require:true },
    obj : [{
      index : {type : String, required: true},
      ctg: {type : String , required: true},
      val: { type: Number , required: true}
     }]

});

const Expense = mongoose.model('Expense', expense);

module.exports = Expense;