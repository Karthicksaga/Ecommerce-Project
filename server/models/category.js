const mongoose = require('mongoose');
const validator = require('validator');

const categorySchema = mongoose.Schema({
    categoryId : {
        type: Number,
        required: true
    },
    categoryName : {
        type: String,
        required: true
    }
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;