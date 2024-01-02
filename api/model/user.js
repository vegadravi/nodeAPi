const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    _id: {
       type:mongoose.Schema.Types.ObjectId,
       required:true
    }
})
module.exports = mongoose.model('user', userSchema)