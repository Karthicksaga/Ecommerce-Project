const path = require('path');

const express = require('express');

//const productController = require('../controllers/productController');
const productController = require('../controllers/productController');
const router = express.Router();


router.post('/test', productController.createTestProduct);
router.get('/get_products', productController.getAllProducts);
router.get('/get_product/:productId', productController.findByProductById);
router.post('/add_product', productController.addProduct);
router.post('/edit_product/:productId', productController.updateProduct);
router.delete('/delete_product/:productId', productController.deleteProduct);
router.get('/getCategory/:categoryId', productController.getProductsByCategory);

// router.post('/product', productController.addProduct);
//router.get('/products/:productId', productController.getProductById);
// router.get('/cart', shopController.getCart);

// router.post('/cart', shopController.postCart);

// router.post('/cart-delete-item', shopController.postCartDeleteProduct);

// router.post('/create-order', shopController.postOrder);

// router.get('/orders', shopController.getOrders);

module.exports = router;

//https://github.com/v-prashant/MRs_Tracker/blob/master/server_side/user.js