const path = require('path');
const sellerController = require("../controllers/sellerController");

const express = require('express');

const router = express.Router();

router.get("/seller" , sellerController.getAllSellerDetails);
router.get("/seller/:sellerId" , sellerController.getSellerDetails);

module.exports = router;
