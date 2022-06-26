const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const auth = require('../middleware/auth');
const { request } = require('express');
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
    const requestBody = req.body;
    if(requestBody != null){
        const name = requestBody.name;
        const fname = requestBody.fname;
        const lname = requestBody.lname;
        const phone = parseInt(requestBody.phone);
        const email = requestBody.email;
        const password = requestBody.password;

        if(name != null && fname != null && lname != null && phone != null && !isNaN(phone)
        && email != null && password != null ){
            console.log("User Field is Empty");
            try {        
                const user = new User({
        
                    name : name,
                    fname :fname,
                    lname : lname,
                    phone : phone,
                    email : email,
                    password : password
        
                });
        
            
                console.log(user);
                if(user){
                    console.log("if block is calling");
                    const userData = await user.save();
                    console.log("after save if block is calling");
                    const token = await user.generateAuthToken();
                    return res.status(201).json({
                        response : {
                            success: true,
                            message : "User Created Successfully",
                            data : {
                                token : token
                            }
                        }
                    });
                }
            }catch(e){
                console.log(typeof e.code);

                if(e.code == 11000) {
                    console.log(e);
                    return res.status(201).json({
                        response: {
                            message : 'Already Registered',
                            success : false,
                            data : null

                        }     
                    })
                }
                console.log(e);
                return res.status(400).json({
                    message: 'User not created',
                    success: false,
                    data : null
                })
            }
        }else{

                    
        res.status(400).json({
            response :{
                message: "Request Body field is empty",
                success : false,
                data : null
            }
        })
        }

        
    }else{
        
        res.status(400).json({
            response :{
                message: "Request Body field is empty",
                success : false,
                data : null
            }
        })
    }   
    
}

/**
 * Login APi
 * End Point : /login
 *
 */

exports.loginCustomer = async(req,res,next) => {

        try{
            const user = await User.findByCredentials(req.body.email, req.body.password);
            if (!user) throw new Error("Unable to find")
            if(user.status == 'terminated') throw new Error('Unable to login')
            console.log("User Terminated Function called");
            const token = await user.generateAuthToken();
            
            return res.status(201).json({
                
                response: {
                    message : "Login Successfully",
                    success: true,
                    data : user,
                    token : token
                }
            });
        }catch(e){
            res.status(404).json({
                response : {
                    success : false,
                    date : null,
                    message : "Not found"
                }
            })
        }
}

exports.getAllUsers = async (req, res, next) => {

    try{
        const users = await User.find({})
        if(users != null && users.length > 0) {

            res.status(200).json({
                response: {
                    success: true,
                    message: 'Got All Users from the Databases',
                    data: users
                }      
            })
        }else{

            res.status(404).json({
                response:{
                    success: false,
                    message: 'No Users Found',
                    data: null
                }
            })
        }
       
    }catch(err){
        console.log(err);
        res.status(500).json({
            response: {
                success: false,
                message: 'Internal Server Error',
                data : null
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

exports.updateCustomerDetails = async (req, res, next) => {

    const requestBody = req.body;
    const userId = mongoose.Types.ObjectId(params.userId);

    if(requestBody != null && userId != null){

            const name = requestBody.name;
            const fname = requestBody.fname;
            const lname = requestBody.lname;
            const phone = requestBody.phone;
            const email = requestBody.email;

            if(name != null && fname != null &&
                lname != null && phone != null && email != null && password != null){
                    const existing = await User.findById({
                        _id: userId
                    });
                    if(user != null){

                        const updateUserDetails = {
                            name: name,
                            fname : fname,
                            lname : lname,
                            phone : phone,
                            email : email
                        }
                        try{
                            const updateUserDetails = await User.updateOne({
                                _id: userId
                            },updateUserDetails);

                            res.status(200).json({

                                response : {
                                    success: true,
                                    message : "User Details Updated Successfully",
                                    data : updateUserDetails
                                }
                            })
                        }catch(err) {
                            res.status(500).json({
                                response : {
                                    success: false,
                                    message : "Internal Server Error",
                                    data : null
                                }
                            })
                        }
                    }
            }else{
                    res.status(400).json({
                        response : {
                            success: false,
                            message : "Bad Request",
                            data : null
                        }
                    })
            }
    }else{
        console.log(err);
        res.status(500).json({
            response : {
                data : null,
                success: false,
                message: 'Internal Server Error'
            }
        })
    }
}

exports.getUserById = async(req,res,next) => {
    
        const userId = mongoose.Types.ObjectId(req.params.id);
        //const userId = req.params.id;
       
        if(userId != null && userId != undefined){
            console.log(typeof userId);
            try{
                const user = await User.find({
                    _id: userId
                })
                console.log(user);
                if(user != null && user.length > 0){
                    res.status(200).json({
                        response : {
                            success: true,
                            message : "User Details Found",
                            data : user[0]
                        }
                    })
                }
            }catch(err){
                console.log(err);
                res.status(500).json({
                    response : {
                        data : null,
                        success: false,
                        message: 'Internal Server Error'
                    }
                })
            }
            
        }else{
            res.status(404).json({
                response : {
                    success: false,
                    message : "User Not Found",
                    data : null
                }
            })
        }
}

exports.deleteCustomer = async(req,res,next) => {

    console.log("Delete Customer Api called Successfully");

   
    //const userId = mongoose.Types.ObjectId(req.params.id);
    const userId = req.params.id;
    console.log("Given User Id " + userId);
    
    if(userId != null && userId != undefined){
        try{
            
            console.log(typeof userId);
            console.log("Delete Customer Inside Try block called");
            const deletedUser = await User.deleteOne({
                _id : userId
            });

            if(deletedUser['deletedCount'] !== 0){
                res.status(200).json({
                    response: {
                        success: true,
                        message: 'User Deleted Successfully',
                        data: deletedUser
                    }   
                })
            }else{
                res.status(400).json({
                    response: {
                        success: false,
                        message: 'User Not Deleted',
                        data: null
                    }   
                })
            }
        }catch{
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                data : null
            })
        }
    }
}

// exports.deleteCustomer = async (req, res) => {
//     try{
//         console.log(req.user);
//         req.user.status = 'terminated'
//         //await req.user.remove();
//         await req.user.save();
//         res.send(req.user);
//     }catch(e){
//         res.status(500).send({
//             error: e.message
//         });
//     }
// }