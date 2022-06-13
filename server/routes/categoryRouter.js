const path = require('path');

const express = require('express');

const categoryController = require('../controllers/categoryController');

const router = express.Router();


router.get('/', categoryController.getCategory);
//router.get('/:categoryId', categoryController.getCategoryById);
router.post('/',categoryController.addCategory); //add new category 

module.exports = router;
