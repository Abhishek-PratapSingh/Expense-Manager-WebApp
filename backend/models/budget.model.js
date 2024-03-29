const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const budget = new Schema({
    userId: {type : String , require:true },
    amount: { type: Number, required: true , default : 0}
});

const Budget = mongoose.model('Budget', budget);

module.exports = Budget;