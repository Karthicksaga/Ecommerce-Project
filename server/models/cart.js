
//Reference to the Cart model : https://stackoverflow.com/questions/59174763/how-to-add-product-to-shopping-cart-with-nodejs-express-and-mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    products: [{
        productId: mongoose.Types.ObjectId,
        quantity: Number,
        name : String,
        price: Number

    }],
    modifiedOn : {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})


const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;