
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
        type: Number,
        required: true,
    },
    customerState : {
        type: String,
        required: true,
    },
    customerCity :{
        type : String,
        required : true
    },
    customerPinCode : {
        type : Number,
        required : true
    },
    products: [{
        productId: String,
        quantity: Number,
        name : String,
        price: Number,
        imageUrl: String

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
        type: Number,
        required: true
    },
    userId : {
        type : String,
        required : true
    }
})


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;