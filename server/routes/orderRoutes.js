const path = require('path');

const express = require('express');

const orderController  = require('../controllers/orderController');

const router = express.Router();

router.post('/confirmOrder', orderController.confirmOrder);
router.post('/deleteOrder/:orderId', orderController.deleteOrder);
router.get('/getOrders/:orderId', orderController.getOrderById);

router.get('/getAllOrder', orderController.getAllOrders);

module.exports = router;