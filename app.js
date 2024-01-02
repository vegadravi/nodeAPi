const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const productRoute = require('./api/routes/product');
// const facultyRoute = require('./api/routes/faculty');
const userRoute = require('./api/routes/user');
const fileUpload = require('express-fileupload');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://dbuser:R4x8444@nodeapitesting.xleilib.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('error',() =>{
    console.log('Connection failed');
});
mongoose.connection.on('connected',() =>{
    console.log('connection success',);
})

app.use(fileUpload({
    useTempFiles: true
}))

app.use('/product',productRoute);
// app.use('/faculty',facultyRoute);
app.use('/user',userRoute);

app.use((req,res,next) =>{
    res.status(404).json({
        error: 'bed request'
    })
})
module.exports = app;