const Cart = require('../models/cart');
const Product = require('../models/product');
const mongoose = require('mongoose');
const ResponseClass = require('../util/response');

exports.addToCart = async (req,res,next) => {

        const requestBody = req.body;
        
        if(requestBody != null){

            const userId = requestBody.userId;
            const productId = requestBody.productId;
            const quantity = requestBody.quantity;
            //check if the product if present in the backend database
            try{
                const filterById = { _id : productId };
                const projection = {
                    _id : 1,
                    name : 1,
                    price : 1,
                    quantity : 1
                }
                const products = await Product.find(filterById,projection);
                if(product.length > 0){
                    //check if the product quantity is present 
                    const product = product[0];
                    
                    if(product.quantity > 0){
                        const productQuantity = product.quantity
                        if(quantity <= productQuantity){
                            //check if the product is already present in the cart
                            try{
                                //fetch the cart based on User Id
                                const filterByUserId = { userId : userId };

                                // if the cart is not present in the cart it
                                /// return null
                                let existingCart = await findOne(filterByUserId);
                                
                                console.log("Get product from the cart");
                                
                                if(existingCart != null){
                                    //check if the product is already present in the cart
                                    //we stored the product as list of objects
                                    let cartProducts = existingCart.products
                                    let productExists = null;
                                    let productIndex = 0;

                                    for(let cartProd = 0; i < cartProducts.length; cartProd++){
                                        if(cartProducts[cartProd].productId == productId){
                                            productIndex = cartProd;
                                            productExists = cartProducts[cartProd];
                                            break;
                                        }
                                    }
                                    //const productExists = cartProducts.find(product => product.productId == productId);
                                    if(productExists != null){

                                        //update the product quantity
                                        const oldQuantity = productExists.quantity;
                                        const newQuantity = oldQuantity + quantity;
                                        const updateQuantity = { quantity : newQuantity };
                                        productExists.quantity = updateQuantity;

                                        cartProducts[productIndex] =  productExists

                                        //update the cart
                                        const updateProductCart = { products : cartProducts };

                                        //update the quantity
                                        try{
                                            const updateCart = await Cart.updateOne(filterByUserId,updateCart);
                                            console.log("Product updated successfully in the cart");
                                            if(updateCart != null){
                                                const responseClass = new ResponseClass(false,null,"quantity updated in the cart Successfully");
                                                res.status(200).json({
                                                    response : responseClass.getResponse()
                                                });
                                            }
                                        }catch(err){
                                            console.log("Error while updating the cart");
                                            const responseClass = new ResponseClass(true,err,"Error while updating the cart");
                                            res.status(500).json({
                                                response : responseClass.getResponse()
                                            });
                                        }
                                    }
                                }else{

                                    //update the product quantity 
                                    const updateProductQuantity = productQuantity - quantity;

                                    //add the product into the cart
                                    const cart = new Cart({
                                        userId : userId,
                                        products : [{
                                            productId : productId,
                                            quantity : quantity,
                                            name : product.name,
                                            price : product.price * quantity
                                        }],
                                        modifiedOn : Date.now()
                                    })

                                    //create a new cart
                                    try{
                                        const cartSave = await cart.save();
                                        console.log("product added to the cart");
                                        //update the product quantity
                                        try{
                                            const updateProduct = await Product.updateOne({_id : productId},
                                                {quantity : updateProductQuantity});
                                                console.log("Product Quantity Updated in the Product Database");
                                        }catch(err){
                                            const responseClass = new ResponseClass(false,null,"Failed to update the product quantity in the database");
                                            return res.status(500).json({
                                                response: responseClass.getResponse()
                                            });
                                        }
                                        const responseClass = new ResponseClass(true,cartSave,"Product added to the cart");
                                        res.status(201).json({
                                            response : responseClass.getResponse()
                                        })
                                    }catch{
                                        const responseClass = new ResponseClass(false,null,"Error while adding product to cart");
                                        res.status(400).json({
                                            response : responseClass.getResponse()
                                        })
                                    }
                                    
                                }

                            }catch{
                                const responseClass = new ResponseClass(false,null,"Error while adding product to cart");

                                res.status(400).json({
                                    response: responseClass.getResponse()
                                })
                            }
                        }else{
                            const responseClass = new ResponseClass(false,null,"Product quantity is not available");
                            res.status(400).json({
                                response: responseClass.getResponse()
                            })
                        }
                    }else{

                        const responseClass = new ResponseClass(false,null, "product is out of Stack");
                        res.status(400).json({
                            response: responseClass.getResponse()
                        })
                    }
                }else{
                    const responseClass = new ResponseClass(false,null, "product is not present in the database");
                    res.status(400).json({
                        response: responseClass.getResponse()
                    })
                }
            }catch(err){
                const responseClass = new ResponseClass(false,null, "product not found");
                res.status(400).json({
                    response: responseClass.getResponse()
                })
            }
        }else{
            const responseCLass = new ResponseClass(false, null, "request body is empty");
            res.status(400).json({
                response: responseCLass.getResponse()
            })
        }
}




//get the cartDetails 
exports.getCartDetails = async (req,res,next) => {

    console.log("Get cart details controller function started executing ");
    const requestBody = req.body;
    if(requestBody != null){
        const userId = requestBody.userId;
        try{
            const filterByUserId = { userId : userId };
            const projection = {
                _id : 1,
                products : 1,
                modifiedOn : 1
            }
            const cart = await Cart.find(filterByUserId,projection);
            if(cart != null){
                const responseClass = new ResponseClass(false,cart,"cart details fetched successfully");
                res.status(200).json({
                    response : responseClass.getResponse()
                });
            }else{
                const responseClass = new ResponseClass(false,null,"cart details not found");
                res.status(400).json({
                    response : responseClass.getResponse()
                });
            }
        }catch(err){
            const responseClass = new ResponseClass(false,null, "Error while getting the cart details");
            res.status(500).json({
                response: responseClass.getResponse()
            })
        }
    }
}

exports.deleteCartDetails = async(req, res, next) => {
    console.log("Delete cart details controller function started executing ");
    const requestBody = req.body;
    if(requestBody != null){
        const userId = requestBody.userId;
        try{
            const filterByUserId = { userId : userId };
            const cart = await Cart.deleteOne(filterByUserId);
            if(cart != null){
                const responseClass = new ResponseClass(false,cart,"cart details deleted successfully");
                res.status(200).json({
                    response : responseClass.getResponse()
                });
            }else{
                const responseClass = new ResponseClass(false,null,"cart details not found");
                res.status(400).json({
                    response : responseClass.getResponse()
                });
            }
        }catch(err){
            const responseClass = new ResponseClass(false,null, "Error while deleting the cart details");
            res.status(500).json({
                response: responseClass.getResponse()
            })
        }
    }else{
        const responseClass = new ResponseClass(false,null, "request body is empty");
        res.status(400).json({
            response: responseClass.getResponse()
        })
    }
}


// exports.updateCartDetails = async (req,res, next) => {
//     console.log("Update cart details controller function started executing ");
//     const requestBody = req.body;
//     if(requestBody != null){

//     }else{
//         const responseClass = new ResponseClass(false,null, "request body is empty");
//         res.status(400).json({
//             response: responseClass.getResponse()
//         })
//     }
// }