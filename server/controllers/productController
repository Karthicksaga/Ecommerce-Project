const express = require('express');
const Product = require('../models/product');
const Price = require('../models/price');
const Stock = require('../models/stock');
const auth = require('../middleware/auth');
const router = new express.Router();
const Cart = require('../models/cart');

/**
 * Add new product
 */
exports.addNewProduct = async (req, res) => {
    const user = req.user;
    if (user.isAdmin === false) {
        return res.status(400).json({
            message: 'Your not allowed',
            success : false
        });
    }

    const existingProduct = await Product.find({
        name: req.body.name
    });
    if (existingProduct.length !== 0) {
        return res.send({
            message: 'Product already exists'
        })
    }

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        status: req.body.status,
        seller: req.body.seller,
        admin: req.user._id
    });


    const price = new Price({
        purchasePrice: req.body.purchasePrice,
        sellingPrice: req.body.sellingPrice,
        productId: product._id
    })

    const stock = new Stock({
        quantity: req.body.quantity,
        productId: product._id
    });

    try {
        const productDetails = await product.save();
        const priceDetails = await price.save();
        const stockDetails = await stock.save();

        res.status(201).send({
            productDetails,
            priceDetails,
            stockDetails
        });

    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}

/**
 * Get a product by id
 */
exports.getProductById = async (req, res) => {
    const _id = req.body.id;

    try {
        const product = await Product.findOne({
            _id,
            status: "active",
            admin: req.user._id
        });

        if (!product) {
            return res.status(200).json({
                message: "Product not found",
                success : false
            });
        }

        res.send(product);
    } catch (e) {
        res.status(500).json({
            message: "Error occured while fetching product",
            success : false
        })
    }
}

/**
 * Get all Products
 */
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({
            status: "active",
            admin: req.user._id
        });

        if (!products) {
            return res.status(404).json({
                message: "No products found",
                success : false
            });
        }

        res.status(200).json({
            message : "Product Fetched Successfully",
            data : products,
            success : true

        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Error occured while fetching products",
            success : false
        });
    }
}

/**
 * Update the product details
 */
//  router.patch('/product', auth, async (req, res) => {
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ['name', 'description', 'category', 'status', 'quantity'];
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' });
//     }

//     try {
//         updates.forEach((update) => req.user[update] = req.body[update]);
//         await req.user.save();
//         res.send(req.user);
//     } catch (e) {
//         res.status(400).send(e);
//     }
// })

exports.deleteProduct = async (req, res) => {
    try {
        const user = req.user;
        if (user.isAdmin === false) {
            return res.status(400).json({
                message : "Unauthorized Person" , 
                success : false
            });
        }
        const product = await Product.findOne({
            _id: req.body.id,
            admin: req.user._id
        });

        if (!product) {
            return res.status(404).send({
                message: 'Unable to find product'
            });
        }

        product.status = 'terminated'
        await product.save();
        return res.status(200).json({
            message : "Product Deleted Successfully",
            success : true,
        });
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: "Error occured while deleting product",
            success : false
        });
    }
}