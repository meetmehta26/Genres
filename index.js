require('express-async-errors');
const winston = require('winston');
const express = require('express');
const Joi = require('@hapi/joi')
const generes = require('./router/generes');
const auth = require('./router/auth')
const customer = require('./router/customers');
const movie = require('./router/movies');
const users = require('./router/users')
const error = require('./middleware/error');
const mongoose = require('mongoose');
const { transport } = require('winston');
const app = express();




mongoose.connect('mongodb://localhost/Vidly')
    .then(() => console.log('Successfully connected to the database'))
    .catch(() => console.log('Some error occured while connecting to the database'))

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logfile.log" })
    ]
})
winston.add(logger)
app.use(express.json());
app.use('/api/generes', generes);
app.use('/api/customer', customer);
app.use('/api/movie', movie);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);


var port = process.env.PORT || 8000;
console.log(port);
app.listen(port, () => console.log(`Listening at port ${port}`));