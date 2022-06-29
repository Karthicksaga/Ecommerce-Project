const mongoose = require('mongoose');
const Cart = require('../models/cart');
const Product = require('../models/product');
const Order = require('../models/Orders')

let ResponseClass = class ResponseClass {
    
    constructor(status, data, message) {
        this.status = status;
        this.data = data;
        this.message = message;
    }

    getResponse(){
        return { 
                success: this.status,
                message: this.message,
                data: this.data
            }
        }
    
}


exports.confirmOrder = async (req, res, next) => {

    const requestBody = req.body;
    if(requestBody != null) {

        const customer = requestBody.name;
        const address = requestBody.address;
        const mobile = requestBody.phone;
        const state = requestBody.state;
        const city = requestBody.city;
        const email = requestBody.email;
        const pinCode = requestBody.pinCode;
        const userId = requestBody.userId;
        const totalAmount = requestBody.totalAmount;
        const paymentType = requestBody.paymentType;

        //get the product from the cartProducts
        try{
            const cartProducts = await Cart.find({userId: userId}, 
                {'modifiedOn' : 0,'userId' : 0});

            console.log(cartProducts);

            const products = cartProducts[0]['products'];
            console.log(typeof products);
            for (data of products) {
                console.log(data);
                console.log(data.productId);
                console.log(data.imageUrl);
                console.log(data.price);
                console.log(data.quantity);
            }
            if(cartProducts != null) {
                const order = new Order({

                    customerName: customer,
                    customerAddress: address,
                    customerEmail: email,
                    customerState: state,
                    customerCity: city,
                    customerPhone: mobile,
                    products: products,
                    customerPinCode : pinCode,
                    orderDate: new Date(),
                    totalAmount: totalAmount,
                    paymentType : paymentType,
                    userId: userId
                })
                try{
                    const orderResponse = await order.save();
                    if(orderResponse != null) {

                        //remove the products from the cart
                        try{
                            const cartResponse = await Cart.deleteOne({userId: userId});
                            const responseClass = new ResponseClass(true, orderResponse, 'Order placed successfully');
                            res.status(200).json({
                                response: responseClass.getResponse()
                            });
                        
                        }catch(err){
                            const responseClass = new ResponseClass(false, null, 'Error while deleting the cart');
                            return res.status(500).json({
                                response: responseClass.getResponse()
                            });
                        }
                    }
                }catch(err){
                    console.log("Order Store Failed in database");
                    res.status(400).json({
                        response: new ResponseClass(false,null, "order Store Failed in the Database").getResponse()
                    })
                }   
            }
        }catch(err){
            console.log(err);
            const responseClass  =  new ResponseClass(false, null, "Error while getting the cart products");
            return res.status(400).json({
                response: responseClass
            });
        }  
        
    }else{
        const responseClass = new ResponseClass(false, null, "Request body is null");
        res.status(400).json({
            response: responseClass.getResponse()
        })
    }
}
//get all orderS
exports.getAllOrders = async (req, res, next) => {
    try{
        const orderResponse = await Order.find({});
        console.log(orderResponse);
        if(orderResponse != null && orderResponse.length > 0) {
            const responseClass = new ResponseClass(true, orderResponse, 'Orders fetched successfully');
            res.status(200).json({
                response: responseClass.getResponse()
            });
        }else{
            const responseClass = new ResponseClass(false, null, 'no Orders found');
            res.status(200).json({
                response: responseClass.getResponse()
            });
        }
    }catch(err){
        const responseClass = new ResponseClass(false, null, 'Error while fetching the orders');
        return res.status(500).json({
            response: responseClass.getResponse()
        })
    }
}

//delete the orders
exports.deleteOrder = async (req, res, next) => {
    const orderId = req.params.orderId;
    if(orderId != null) {
        try{
            const orderResponse = await Order.deleteOne({_id: orderId});
            if(orderResponse != null) {
                const responseClass = new ResponseClass(true, orderResponse, 'Order deleted successfully');
                res.status(200).json({
                    response: responseClass.getResponse()
                });
            }
        }catch(err){
            const responseClass = new ResponseClass(false, null, 'Error while deleting the order');
            return res.status(500).json({
                response: responseClass.getResponse()
            })
    }
    }else{
        const responseClass = new ResponseClass(false, null, "Order Id is null");
        res.status(400).json({
            response: responseClass.getResponse()
        })
    }
}

//get the byId
exports.getOrderById = async (req, res, next) => {

    const orderId = req.params.orderId;
    if(orderId != null) {
        try{
            const orderResponse = await Order.findOne({_id: orderId});
            if(orderResponse != null) {
                const responseClass = new ResponseClass(true, orderResponse, 'Order fetched successfully');
                res.status(200).json({
                    response: responseClass.getResponse()
                });
            }
        }catch(err){
            const responseClass = new ResponseClass(false, null, 'Error while fetching the order');
            return res.status(500).json({
                response: responseClass.getResponse()
            })
    }
    }else{
        const responseClass = new ResponseClass(false, null, "Order Id is null");
        res.status(400).json({
            response: responseClass.getResponse()
        })
    }
}

exports.getOrderByUserId = async (req, res, next) => {

    const requestBody = req.body;
    const userId = requestBody['userId'];
    if(userId != null) {
        try{
            const orderResponse = await Order.find({userId: userId});
            if(orderResponse != null && orderResponse.length > 0) {
                const responseClass = new ResponseClass(true, orderResponse, 'Order fetched successfully');
                res.status(200).json({
                    response: responseClass.getResponse()
                });
            }else{
                const responseClass = new ResponseClass(false, null, "Failed to fetch the Order")
                res.status(404).json({
                    response : responseClass.getResponse()
                })
            }
        }catch(err){
            const responseClass = new ResponseClass(false, null, 'Error while fetching the order');
            return res.status(500).json({
                response: responseClass.getResponse()
            })
    }
    }else{
        const responseClass = new ResponseClass(false, null, "Order Id is null");
        res.status(400).json({
            response: responseClass.getResponse()
        })
    }
}