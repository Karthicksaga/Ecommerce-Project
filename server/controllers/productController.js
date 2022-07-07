const Product = require('../models/product');
const mongoose = require('mongoose');
//add product
exports.addProduct = async(req,res,next) => {

    const requestBody = req.body;
    if(requestBody != null){

        const productName = requestBody.name;
        const productDescription = requestBody.description;
        const productImageUrl = requestBody.imageUrl;
        const productCategory = requestBody.categoryId;
        const productPrice = requestBody.price;
        const productQuantity = requestBody.quantity;

        console.log("Request Body: " + JSON.stringify(requestBody))
        if(productName != null && productDescription != null && productImageUrl != null
             && productCategory != null && productPrice != null && productQuantity != null){

            //check if the product is already exists
            try{
                const existingProduct = await Product.find({
                    name: productName
                })
                console.log(existingProduct);
                if(existingProduct.length !== 0){
                    res.status(409).json({

                        message: "Product already exists",
                        success: false,
                        data: null

                    })
                }else{
                    //create the product
                    const product = new Product({
                        name: productName,
                        description: productDescription,
                        imageUrl: productImageUrl,
                        categoryId: productCategory,
                        price: productPrice,
                        quantity: productQuantity
                    })

                    try{
                    const savedProduct = await product.save();
                    console.log(savedProduct);
                    res.status(201).json({
                        response : {
                            message: "Product added successfully",
                            success: true,
                            data: savedProduct
                        }
                    })
                    }catch(err){
                        res.status(500).json({
                            response : {
                                message: "Error while adding product",
                                success: false,
                                data: null
                            }
                        })
                    }
                    //save the product into db
                    
                }

                
            }catch(err){
                //409 already exists conflict occurs
                res.status(500).json({
                   response : {
                          message : "Internal Server Error",
                           data : null,
                         success: false
                   }

                })
            }
        
    }else{
        res.status(400).json({
            response: {
                success: false,
                message: "Bad Request",
                data: null
            }
        })
    }

    }else{
        res.status(400).json({
            response: {
                success: false,
                message: "Bad Request",
                data: null
            }
        })
    }

}


//get all products  
exports.getAllProducts = async(req,res,next) => {
        console.log("All Product Controller Server Part Called ");
        try{
            const products = await Product.find();
            if(products.length > 0){
                res.status(200).json({
                    response: {
                        success: true,
                        message: "Products found",
                        data: products
                    }
                })
            }else{
                res.status(404).json({
                    response: {
                        success: false,
                        message: "No products found",
                        data: null
                    }
                })
                
            }
        }catch(err){
            res.status(500).json({
                response: {
                    success: false,
                    message: "Internal Server Error",
                    data: null
                }
            })
                
        }

}

    //FindByProductName
    exports.findByProductById = async(req,res,next) => {
        const productId = req.params.productId;
        if(productId !== null && productId !== undefined) {
            try{
                const product = await Product.find({
                    _id: productId
                })
                if(product.length > 0){
                    res.status(200).json({
                        response: {
                            success: true,
                            message: "Product found",
                            data: product
                        }
                    })
                }else{
                    res.status(404).json({
                        response: {
                            success: false,
                            message: "No product found",
                            data: null
                        }
                    })
                }
            }catch(err){
                res.status(500).json({
                    response: {
                        success: false,
                        message: "Internal Server Error",
                        data: null
                    }
                })
            }
        }else{
            res.status(400).json({
                response: {
                    success: false,
                    message: "Bad Request",
                    data: null
                }
            })
        }
    }

    //Update the product 
    //Reference:https://stackoverflow.com/questions/32811510/mongoose-findoneandupdate-doesnt-return-updated-document
    exports.updateProduct = async(req,res,next) => {

        const productId = req.params.productId;
        const requestBody = req.body;
        if(requestBody != null){
            console.log("Request Body: " + JSON.stringify(requestBody))
            const productName = requestBody.name;
            const productDescription = requestBody.description;
            const productImageUrl = requestBody.imageUrl;
            const productCategory = requestBody.categoryId;
            const productPrice = requestBody.price;
            const productQuantity = requestBody.quantity;

            if(productName != null && productDescription != null && productImageUrl != null
                && productCategory != null && productPrice != null && productQuantity != null){

                    const id = mongoose.Types.ObjectId(productId);
                    console.log(productId);
                    try{
                        
                        const existingProduct = await Product.find({
                            _id: id
                        })
                        console.log(existingProduct);
                        if(existingProduct.length !== 0){
                            //update the product
                            
                            updatedProductDetails = {
                                name: productName,
                                description: productDescription,
                                imageUrl: productImageUrl,
                                categoryId: productCategory,
                                price: productPrice,
                                quantity: productQuantity,
                                updatedAt : Date.now()
                            }

                        //HTTP - 200, 204 updated successfully  and 201 new product create successfully
                           try{

                            console.log("Updated product Details Block Failed");
                            const product = await Product.updateOne({
                                _id: id
                            },updatedProductDetails);

                            res.status(200).json({
                                response: {
                                    success: true,
                                    message: "Product updated successfully",
                                    data: product
                                }
                            })
                           }catch(err){
                                 res.status(500).json({
                                    response: {
                                        success: false,
                                        message: "Internal Server Error",
                                        data: null

                                    }
                                 })
                           }

                        }else{
                            res.status(404).json({
                                response: {
                                    success: false,
                                    message: "Product not found",
                                    data: null
                                }
                            })
                        }
                        
                    }catch(err){
                        res.status(500).json({
                            response: {
                                success: false,
                                message: "Internal Server Error",
                                data: null
                            }
                        })
                    }
   
        }
                else{
                    res.status(400).json({
                        response: {
                            success: false,
                            message: "Bad Request",
                            data: null
                        }
                    })
                }

        }else{
            res.status(400).json({
                response: {
                    success: false,
                    message: "Bad Request",
                    data: null
                }
            })
        }
        
    }

     //delete product by producId 
    exports.deleteProduct = async(req, res, next) => {

        //get the requestparmas
        const productId = req.params.productId;

        console.log("Product Id  : " + productId);
        if(productId !== undefined && productId !== null){

            try{

                const deletedProductStatus = await Product.deleteOne({
                    _id : productId
                })

                if(deletedProductStatus !== null && deletedProductStatus['deletedCount'] !== 0){

                    res.status(200).json({
                        response : {
                            "message" : "Product deleted Successfully",
                            success : true,
                            data  : deletedProductStatus
                        }
                    })
                }else{

                    res.status(404).json({
                        response : {
                            "message" : "Product not found",
                            success : false,
                            data  : null
                        }
                    })
                }
            }catch{

                res.status(500).json({
                    response : {
                        "message" : "Internal Server Error",
                        success : false,
                        data  : null
                    }
                })
            }
        }else{

            res.status(404).json({
                response : {

                    'message' : 'param id is null', 
                    success : false,
                    data : null
                }
            })
        }
    }
    //delete product by id

    // exports.deleteProduct = async(req,res,next) => {
    //     const productId = req.params.productId;
        
    //     console.log("delete Product Function called");
    //     if(productId != null){

    //         try{
    //             const deletedProduct = await Product.deleteOne({
    //                 _id: productId
    //             });
    //             console.log(deletedProduct);
    //             res.status(204).json({
    //                 response: {
    //                     success: true,
    //                     message: "Product deleted successfully",
    //                     data: deletedProduct
    //                 }
    //             })
    //         }catch(err){
    //             res.status(500).json({
    //                 response: {
    //                     success: false,
    //                     message: "Internal Server Error",
    //                     data: null
    //                 }
    //             })
    //         }
    //     }else{
    //         res.status(400).json({
    //             response: {
    //                 success: false,
    //                 message: "Bad Request",
    //                 data: null
    //             }
    //         })
    //     }
    // }
    //create a database 
    exports.createTestProduct = async(req,res,next) => {
        const product = new Product({
            name: "Samsung",
            description: "Samsung is a multinational technology company headquartered in Seoul, South Korea. It is the largest manufacturer of mobile phones, and the highest-grossing brand in the world.",
            imageUrl: "https://www.samsung.com/etc/designs/smg/global/imgs/logo-samsung.png",
            categoryId: "1",
            price: 100,
            quantity: 10
        })
        try{
            const savedProduct = await product.save();
            console.log(savedProduct);
            res.status(201).json({
                response : {
                    message: "Product added successfully",
                    success: true,
                    data: savedProduct
                }
            })
        }catch(e){
            res.status(500).json({
                response : {
                    message: "Error while adding product",
                    success: false,
                    data: null
                }
            })
        }
    }
    

    exports.getProductsByCategory = async(req,res,next) => {
        const categoryId = req.params.categoryId;
        if(categoryId != null){
            try{
                const products = await Product.find({
                    categoryId: categoryId
                })
                if(products.length > 0){

                    console.log("Got the Product from Database");
                    res.status(200).json({
                        response: {
                            success: true,
                            message: "Products found",
                            data: products
                        }
                    })
                }else{
                    res.status(404).json({
                        response: {
                            success: false,
                            message: "No products found",
                            data: null
                        }
                    })
                }
            }catch(err){
                res.status(500).json({
                    response: {
                        success: false,
                        message: "Internal Server Error",
                        data: null
                    }
                })
            }
        }else{
            res.status(400).json({
                response: {
                    success: false,
                    message: "Bad Request",
                    data: null
                }
            })
        }
    }
