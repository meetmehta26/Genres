const express = require('express');
const Joi = require('@hapi/joi')
const generes = require('./router/generes');
const customer= require('./router/customers');
const mongoose = require('mongoose');
const app = express();




mongoose.connect('mongodb://localhost/Vidly')
    .then(() => console.log('Successfully connected to the database'))
    .catch(() => console.log('Some error occured while connecting to the database'))


app.use(express.json());
app.use('/api/generes',generes);
app.use('/api/customer',customer);


var port = process.env.PORT|| 8000;
console.log(port);
app.listen(port,()=>console.log(`Listening at port ${port}`));