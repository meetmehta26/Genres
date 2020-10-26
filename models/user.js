const Joi = require('@hapi/joi');
const mongoose = require('mongoose');


const User = mongoose.model('Users', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 250,
        unique : true
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 1024,
    },
}));
function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(250).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    }
    console.log(genre, "typeof", typeof (genre));
    return Joi.validate(user, schema);

}

exports.User=User;
exports.validate= validateUser;