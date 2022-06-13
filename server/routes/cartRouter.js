const path = require('path');

const express = require('express');

const cartController = require('../controllers/cartController');

const router = express.Router();

router.post('/add_cart', cartController.addToCart);
router.get('/get-cart', cartController.getCartDetails);

module.exports = router;