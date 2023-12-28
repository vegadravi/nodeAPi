const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const studentRoute = require('./api/routes/student');
const facultyRoute = require('./api/routes/faculty');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://dbuser:R4x8444@nodeapitesting.xleilib.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('error',() =>{
    console.log('Connection failed');
});
mongoose.connection.on('connected',() =>{
    console.log('connection success',);
})

app.use('/student',studentRoute);
app.use('/faculty',facultyRoute);

app.use((req,res,next) =>{
    res.status(404).json({
        error: 'bed request'
    })
})
module.exports = app;