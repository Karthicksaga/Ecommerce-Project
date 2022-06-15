
//Reference to the Cart model : https://stackoverflow.com/questions/59174763/how-to-add-product-to-shopping-cart-with-nodejs-express-and-mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = mongoose.Schema({
    customerName: {
        type: String,
        required: true,
    },
    customerAddress: {
        type: String,
        required: true,
    },
    customerEmail: {
        type: String,
        required: true,
    },
    customerPhone: {
        type: String,
        required: true,
    },
    customerLocation : {
        type: String,
        required: true,
    },
    products: [{
        productId: mongoose.Types.ObjectId,
        quantity: Number,
        name : String,
        price: Number

    }],
    orderDate : {
        type: Date,
        default: Date.now
    },
    
    totalAmount : {
        type: Number,
        required: true,
    },
    paymentType : {
        type: String,
        required: true
    }
})


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;