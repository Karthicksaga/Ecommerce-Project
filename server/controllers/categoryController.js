const express = require('express');
const Category = require('../models/category')
const mongoose = require('mongoose');



//add new Category

exports.addCategory = async (req, res, next) => {

    const existingCategory = [];

    console.log("Added Category Controller Started Execting");
    const requestBody = req.body
    if(requestBody != null){
        const categoryId = requestBody.categoryId
        const categoryName = requestBody.categoryName
        if(categoryName != null && categoryId != null){
            //check the category is already exists
            try{
                const existingCategory = await Category.find({
                    categoryId: categoryId
                })

                console.log("Length of the Exisiting Category :"+ existingCategory.length);
                if(existingCategory.length === 0){
                 
                    const category = new Category({
                        categoryId: categoryId,
                        categoryName: categoryName
                    })
                    try {
                        const categorySave = await category.save()
                        res.status(201).json({
                            response : {
                                success : true,
                                message : "Category Added Successfully",
                                data : categorySave
                            }
                        })
                    } catch (e) {
                        console.log(e);
                        res.status(400).json({
                            response:{
                                success : false,
                                message : "Error occured while adding category",
                                data : null
                            }
                        });
                    }
                }else{
                    res.status(400).json({
                        response: {
                            success: false,
                            message: "Category already exists",
                            data: null
                        }
                    })
                }
            }catch(err){
                console.log(err);
                console.log("Error in the Server part")
                res.status(500).json({
                    response: {
                        message: "Internal Server Error",
                        success: false,
                        data : null

                    }
                })
            }
            }
            else{
              res.status(400).json({
                response:{
                    success: false,
                    message: "categoryId or categoryName is empty",
                    data: null
                }
              })
        }
    }else{
        res.status(400).json({
            response: {
                message: "Request body is empty",
                success: false,
                data : null
            }
        })
    }
}



//get the category by id

exports.getCategory =async (req, res,next) => {
    const filter = {}
    try{
        const allCategory = await Category.find(filter);
        if(allCategory.length !== 0){
            res.status(200).json({
                response: {
                    success: true,
                    message: "Category found",
                    data: allCategory
                }
            })
        }else{
            res.status(404).json({
                response: {
                    success: false,
                    message: "Category not found",
                    data: null
                }
            })
        }
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            response: {
                message: "Internal Server Error",
                success: false,
                data : null
            }
        })
    } 

}
exports.getCategoryById = async (req, res, next) => {

    const categoryId = req.params.categoryId;
    
    if(categoryId != null){

        console.log(typeof categoryId);
        const category = await Category.find({
            _id: mongoose.Types.ObjectId(categoryId)
        })
        if(category.length !== 0){
            res.status(200).json({
                response: {
                    success: true,
                    message: "Category found",
                    data: category
                }
            })
        }else{
            res.status(400).json({
                response: {
                    success: false,
                    message: "Category not found",
                    data: null
                }
            })
        }
    }else{
        res.status(400).json({
            response: {
                message: "Category id is empty",
                success: false,
                data : null
            }
        })
    }
}
