const mongoose = require('mongoose');

//name, description, imageURl,category,quantity,price,quantity
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true
    },
    categoryId: {
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity: {
        type : Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;