const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.post('/singup', (req, res,next) => {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        if(err){
            return res.status(500).json({
                error:err
            })
        }else{
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: hash,
                email: req.body.email,
                phone: req.body.phone,
                userType: req.body.userType
            });
            user.save().then(result =>{
                console.log(result);
                res.status(200).json({
                    msg:'this is user post request',
                    createdUser: result
                })
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error:err
                })
            })
        }
    })
    
})
router.post('/login', (req, res,next) => {
    User.find({username: req.body.username}).exec().then(user =>{
        if(user.length < 1){
            return res.status(401).json({
                msg:'User not found'
            })
        }
        bcrypt.compare(req.body.password, user[0].password, function(err, result) {
            if(err){
                return res.status(401).json({
                    msg:'Password matching failed'
                })
            }
            if(result){
                const token = jwt.sign({
                    username: user[0].username,
                    userType: user[0].userType,
                    email: user[0].email,
                    phone: user[0].phone
                },
                ' this is dummy secret key',
                {
                    expiresIn: '24h'
                }
                );
                res.status(200).json({
                    username: user[0].username,
                    userType: user[0].userType,
                    email: user[0].email,
                    phone: user[0].phone,
                    token: token
                })
            }
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