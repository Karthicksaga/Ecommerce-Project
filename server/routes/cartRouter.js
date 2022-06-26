const path = require('path');

const express = require('express');

const cartController = require('../controllers/cartController');

const router = express.Router();

router.post('/add_cart', cartController.addToCart);
router.post('/get-cart', cartController.getCartDetails);
router.post('/delete-cart', cartController.deleteCartDetails);

module.exports = router;