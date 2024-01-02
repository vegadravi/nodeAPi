const express = require('express');
const router = express.Router();
const productModel = require('../model/product');
const mongoose = require('mongoose');
const checkAuth = require('../middlewqare/check-auth');
 const cloudinary = require('cloudinary').v2;
//import {v2 as cloudinary} from 'cloudinary';


cloudinary.config({ 
    cloud_name: 'dl6o6uey0', 
    api_key: '455467332679697', 
    api_secret: 'kvtV-AqXWEE9ThhSjJLXrEJ8ZxE' 
  });
  
router.get('/',checkAuth, (req, res,next) => {
    productModel.find().then(doc =>{
        res.status(200).json({
            msg:'this is product get request',
            productData: doc
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})
router.get('/:id', (req, res,next) => {
    const id = req.params.id;
    productModel.findById(id).then(doc =>{
        res.status(200).json({
            productData: doc
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})
router.post('/', (req, res,next) => {
    const file = req.files.image;
    cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
        const product = new productModel({
            _id: new mongoose.Types.ObjectId(),
            productname: req.body.productname,
            price: req.body.price,
            productType: req.body.productType,
            imagePath: result.url
        });
        product.save().then(result =>{
            res.status(200).json({
                msg:'this is product post request',
                createdproduct: result
            })
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
    })
    
})
router.delete('/:id', (req, res,next) => {
    productModel.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message:"this is product delete request",
            result: result
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

router.put('/:id', (req, res,next) => {
    const id = req.params.id;
    productModel.updateOne({_id: id}, {$set: 
    {
        productname: req.body.productname,
        price: req.body.price,
        productType: req.body.productType
    }
    }).then(result =>{
        res.status(200).json({
            msg:'this is product put request',
            result: result
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})
module.exports = router;