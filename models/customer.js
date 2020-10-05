const Joi = require('@hapi/joi')
const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    isGold:{
        type: Boolean,
        required :true,
    },
    phoneNumber:{
        type:Number,
        required:true,
        min:1000000000,
        maxlength:9999999999,

    }
})

const Customer = mongoose.model('customer', schema);
function validateGenre(customer){
    const schema={
        name : Joi.string().min(5).required(),
        phoneNumber : Joi.number().integer().min(1000000000).max(9999999999).required(),
        isGold:Joi.boolean().required()
    }
    return Joi.validate(customer, schema);

}

exports.Customer = Customer;
exports.validate= validateGenre;
