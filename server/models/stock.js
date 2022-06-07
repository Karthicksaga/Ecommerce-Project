const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    }
}, {
    timestamps: true
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;