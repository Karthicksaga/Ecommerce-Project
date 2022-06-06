const path = require('path');

const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

// /admin/add-product => GET
router.post('/register', userController.registerUser);

router.post('/login' , userController.loginUser);

// // /admin/products => GET
// router.get('/products', adminController.getProducts);

// // /admin/add-product => POST
// router.post('/add-product', adminController.postAddProduct);

// router.get('/edit-product/:productId', adminController.getEditProduct);

// router.post('/edit-product', adminController.postEditProduct);

// router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
