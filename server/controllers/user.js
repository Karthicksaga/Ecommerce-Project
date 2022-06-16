const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();



//admin creation api 
exports.adminRegistration = async (req, res) => {

    try {
        const user = new User({
            name : req.body.name,
            phone : req.body.phone,
            email : req.body.email,
            password : req.body.password,
            isAdmin : true

    });
    await user.save();
    const token = await user.generateAuthToken();
    console.log(token);
    return res.status(201).json({
        success: true,  
        message : "Admin Created Successfully"
    });
    } 
    catch(e){
        if (e.code == "11000"){
            return res.status(400).json({
                success: false,
                message: 'Admin Already Created'
            })
        }
    }
    
}

//customer registration

exports.userRegistration = async(req, res,next) => {

    console.log("User Registration Api Called Successfully");
    try {
        const user = new User({
            name : req.body.name,
            phone : req.body.phone,
            email : req.body.email,
            password : req.body.password
        });

    
        console.log(user);
        if(user){
            console.log("if block is calling");
            const userData = await user.save();
            console.log("after save if block is calling");
            const token = await user.generateAuthToken();
            return res.status(201).json({
                success: true,
                message : "User Created Successfully",
                data : {
                    token : token
                }
            });
        }
    }catch(e){
        if(e.code == '11000') {
            return res.status(400).send({
                message: 'Already Registered',
                success: false
            })
        }
        console.log(e);
        return res.status(400).json({
            message: 'User not created',
            success: false
        })
    }
}

/**
 * Login APi
 * End Point : /login
 *
 */

exports.loginCustomer = async(req,res) => {

        try{
            const user = await User.findByCredentials(req.body.email, req.body.password);
            if (!user) throw new Error("Unable to find")
            if(user.status == 'terminated') throw new Error('Unable to login')
            console.log("User Teminated Function called");
            const token = await user.generateAuthToken();
            
            return res.status(201).json({
                
                data: {
                    token: token, 
                    "userName" : user.name,
                    isAdmin : user.isAdmin,
                    success: true,
                    message: 'Login Successful',
                }
            });
        }catch(e){
            res.status(404).json({
                data:{
                    success: false,
                    message:"NOT FOUND"
                }
            })
        }
}

/**
 * 
 * logout customer  
 */
exports.logoutCustomer = async(req, res) => {

    try {

        req.user.tokens  = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();
        res.status(200).json({
            success: true,
            message: 'Logout Successful'
        })
    }catch{
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}


/*
    api endPoint : /logoutAll
*/

exports.logoutAllCustomer = async(req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).json({
            success: true,
            message: 'Logout Successful'
        })
    }catch(e){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}



// router.get('/getAccountDetails', auth, async (req, res) => {
//     res.send(req.user);
// })


/**
 * Update Account Details
 *  
 */
exports.updateCustomerDetails = async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'status'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).json({
            message: "Unable to update",
            status: false
        });
    }
}


exports.deleteCustomer = async (req, res) => {
    try{
        console.log(req.user);
        req.user.status = 'terminated'
        //await req.user.remove();
        await req.user.save();
        res.send(req.user);
    }catch(e){
        res.status(500).send({
            error: e.message
        });
    }
}