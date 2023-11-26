const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const category = new Schema({
    userId: {type : String , require:true },
    ctg: [{type: String , require:true }]
});

const Category = mongoose.model('Category', category);

module.exports = Category;