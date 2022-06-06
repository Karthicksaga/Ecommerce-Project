const validator = require('validator');
const User = require('../models/user');


function validateRegisterForm(payload) {
    let errors = {};
    let isFormValid = true;

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Please provide a correct email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 3) {
        isFormValid = false;
        errors.password = 'Password must have at least 3 characters.';
    }

    if (!payload || typeof payload.uname !== 'string' || payload.uname.trim().length === 0) {
        isFormValid = false;
        errors.name = 'Please provide your name.';
    }

    return {
        success: isFormValid,
        errors
    };
}

function validateLoginForm(payload) {
    let errors = {};
    let isFormValid = true;
    console.log(payload);
    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
        isFormValid = false;
        errors.password = 'Please provide your password.';
    }

    if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
        isFormValid = false;
        errors.name = 'Please provide your email address.';
    }

    return {
        success: isFormValid,
        errors
    };
}

 
exports.registerUser = (req, res, next) => {

    console.log("User Register api called");
    let validateResult = validateRegisterForm(req.body);
    console.log(req.body);
    if(!validateResult.success){
        return res.status(400).json({
            success: false,
            message: 'Form validation failed',
        })
    }
    const user = new User(req.body.email, req.body.password,req.body.uname);
    user.fetchAllUserEmail()
    .then(result =>{
        console.log("User Data Fetched successfully");
        return result;
    }).then(userEmail => {
        let existEmail = false;
        if(userEmail.length > 0){
            for(let i = 0; i < userEmail.length; i++){
                if(userEmail[i].email === user.email){
                    existEmail = true;
                }
            }
            if (existEmail){
                console.log("Email already exists");
                return res.status(200).json({
                    success: false,
                    message: 'User already exist',
                })
            }else{
                const user = new User(req.body.email, req.body.password,req.body.uname);
                user.registerUser().then(
                    (result) => {
                        return res.status(200).json({
                            success: true,
                            message: 'User registered successfully',
                        })
                    }
                ).catch(err =>{
                    return res.status(500).json({
                        success: false,
                        message : "user registration failed"
                    })
                })
            } 
        }  
    }).catch(err =>{
        console.log(err);
        return res.status(500).json({
            success: false,
            message : "user registration failed"
        })
    })
    
}
exports.loginUser = (req, res, next) => {

    const loginRequestBody = req.body;
    let validatedResult = validateLoginForm(loginRequestBody);
    if (!validatedResult.success){
        return res.status(400).json({
            success: false,
            message: 'Form validation failed',
        })
    }

    const email = loginRequestBody.email;
    const password = loginRequestBody.password;

    User.findByEmail(email)
    .then(userResult => {
        
        if(userResult !== null){

            console.log(userResult);
        }
    }).catch(error => {
        return res.status(400).json({
            success: false,
            message: 'User not found',
        });
    })

}   
