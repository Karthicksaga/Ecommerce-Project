const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

// /admin/add-product => GET
router.post('/adminRegistration', userController.adminRegistration);

router.post('/customerRegistration' ,userController.userRegistration);

router.post('/login', userController.loginCustomer);

router.get('/logout', userController.logoutCustomer);

router.get('/logoutAll', userController.logoutAllCustomer);

router.patch('/updateCustomerDetails', userController.updateCustomerDetails);

router.delete('/removeAccount', userController.deleteCustomer);


module.exports = router;
