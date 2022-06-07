const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    starValue: {
        type: Number,
        default: 0,
        required: true,
    },
    category: {
        type: String,
        required: true,
        lowercase: true,
        enum: ['grocery', 'mobile']
    },
    status: {
        type: String,
        required: true,
        lowercase: true,
        enum: ['active', 'terminated']
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Seller'
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;