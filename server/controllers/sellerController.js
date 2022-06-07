const express = require('express');
const Seller = require('../models/seller');
const auth = require('../middleware/auth');
const router = new express.Router();


/**
 * Add new Seller details
 * 
 * */
/*
APIENDPOINT : '/seller'
*/


exports.addSeller = async(req,res) => {
    const user = req.user;
    if(user.isAdmin === false) {
        return res.status(400).json({
            message: 'Your not allowed'
        });
    }

    const seller = new Seller({
        ...req.body,
        admin: req.user._id
    })

    try {
        const sellerData = await seller.save();
        res.status(201).json({
            message: 'Seller added successfully',
            success: true
        });
    } catch (e) {
        if(e.code == '11000') {
            return res.status(400).json({
                message: 'Seller already exists',
                success: false
            })
        }
        return res.status(400).json({
            message: 'Seller not added',
            success: false
        });
    }
}

/*

APIENDPOINT : '/seller/
Method : GET
*/


exports.getSellerData = async (req, res) => {

    const user = req.user;

    if(user.isAdmin === false){
        return res.status(400).json({
            message : "authorization failed",
        });
    }

    const _id = req.body.id;

    try {

    }catch(e){
        if(e.code == '11000') {
            return res.status(400).json({
                message: 'seller al registered',
                success : true,
            })
        }
        res.status(500).json({
            message: 'server error',
            success : false
        });
    }
}
router.get('/seller', auth, async (req, res) => {
    const user = req.user;
    
    if(user.isAdmin === false) {
        return res.status(400).send({
            Message: 'Your not allowed'
        });
    }

    const _id = req.body.id;

    try {
        const seller = await Seller.findOne({
            _id,
            admin: req.user._id
        });

        if (!seller) {
            return res.status(404).json({
                message: 'Seller not found',
                success : false
            });
        }

        res.status(200).json({
            message : "Seller Fetched Successfully",
            data : seller,
            success : true
        });
    } catch (e) {
        if(e.code == '11000') {
            return res.status(400).send({
                message: 'Already Registered'
            })
        }
        
    }
})



/*
    Get all Seller  details
*/

exports.getAllSellerDetails = async (req, res) => {

    try {

        const user = req.user
        if (!user.isAdmin){
            return res.status(400).json({
                message: 'Your not allowed',
                status :false
            });
        }

        const seller = await Seller.find({
            admin: req.user._id
        });

        if (!seller) {
            return res.status(404).json({
                message: 'No seller found',
                status : false
            });
        }

        res.status(200).json({
            message : "Seller Fetched Successfully",
            data : seller,
            status : true
        });

    }catch(e){

        res.status(500).json({
            'message' : "Internal Server Error",
            success : false 
        })
    }
}
