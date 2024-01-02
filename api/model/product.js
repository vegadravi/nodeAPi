const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    _id: {
       type:mongoose.Schema.Types.ObjectId,
       required:true
    }
})
module.exports = mongoose.model('product', productSchema)