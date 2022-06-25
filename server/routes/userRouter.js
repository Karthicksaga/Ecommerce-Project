const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

// /admin/add-product => GET
router.post('/adminRegistration' ,userController.adminRegistration);

router.post('/customerRegistration', userController.userRegistration);

router.post('/login', userController.loginCustomer);

router.get('/logout', userController.logoutCustomer);

router.get('/allUsers', userController.getAllUsers);

router.get('/logoutAll', userController.logoutAllCustomer);

router.put('/updateCustomerDetails/:id', userController.updateCustomerDetails);

router.delete('/removeUser/:id', userController.deleteCustomer);

router.get('/:id', userController.getUserById);


module.exports = router;
