const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    _id: {
       type:mongoose.Schema.Types.ObjectId,
       required:true
    }
})
module.exports = mongoose.model('Student', studentSchema)