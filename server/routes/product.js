const path = require('path');

const express = require('express');

const productController = require('../controllers/productController');

const router = express.Router();


router.get('/products', productController.addNewProduct);

router.get('/products/:productId', productController.getProductById);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.post('/create-order', shopController.postOrder);

router.get('/orders', shopController.getOrders);

module.exports = router;
