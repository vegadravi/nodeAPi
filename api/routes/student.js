const express = require('express');
const router = express.Router();
const studentModel = require('../model/student');
const mongoose = require('mongoose');
router.get('/', (req, res,next) => {
    studentModel.find().then(doc =>{
        res.status(200).json({
            msg:'this is student get request',
            studentData: doc
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
    studentModel.findById(id).then(doc =>{
        res.status(200).json({
            studentData: doc
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
    const student = new studentModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        gender: req.body.gender,
        email: req.body.email
    });
    student.save().then(result =>{
        console.log(result);
        res.status(200).json({
            msg:'this is student post request',
            createdStudent: result
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})
router.delete('/:id', (req, res,next) => {
    studentModel.deleteOne({_id: req.params.id}).then(result =>{
        res.status(200).json({
            message:"this is student delete request",
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
    studentModel.updateOne({_id: id}, {$set: 
    {
        name: req.body.name,
        gender: req.body.gender,
        email: req.body.email
    }
    }).then(result =>{
        res.status(200).json({
            msg:'this is student put request',
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