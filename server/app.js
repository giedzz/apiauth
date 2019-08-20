const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');


if (!process.env.NODE_ENV === 'test'){
    mongoose.connect('mongodb://localhost/APIauthentication', { useNewUrlParser: true });
}else {
    mongoose.connect('mongodb://localhost/APIauthenticationTEST', { useNewUrlParser: true });
}



const app = express();

app.use(cors());

// Middlewares 
if (!process.env.NODE_ENV === 'test'){
    app.use(morgan('dev'));
}

app.use(bodyParser.json());

// Router

app.use('/users', require('./routes/users'));

//http://localhost:3000/users



module.exports = app;