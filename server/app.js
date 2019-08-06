const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


if (!process.env.NODE_ENV === 'test'){
    mongoose.connect('mongodb://localhost/APIauthenticationTEST', { useNewUrlParser: true });
}else {
    mongoose.connect('mongodb://localhost/APIauthenticationTEST', { useNewUrlParser: true });
}



const app = express();

// Middlewares 
if (!process.env.NODE_ENV === 'test'){
    app.use(morgan('dev'));
}

app.use(bodyParser.json());

// Router

app.use('/users', require('./routes/users'));

//http://localhost:3000/users



module.exports = app;