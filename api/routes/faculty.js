const express = require('express');
const router = express.Router();
 
router.get('/', (req, res,next) => {
    res.status(200).json({
        msg:'this is faculty get request',
    })
})
router.get('/name', (req, res,next) => {
    res.status(200).json({
        //msg:'this is faculty get request',
        name:"Ravi"
    })
})
router.post('/', (req, res,next) => {
    res.status(200).json({
        msg:'this is faculty post request'
    })
})
module.exports = router;