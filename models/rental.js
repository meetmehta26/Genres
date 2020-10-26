const Joi = require('@hapi/joi')
const mongoose = require('mongoose');

const customer = new mongoose.Schema({
    _id:String,
    name: String,
    isGold: Boolean,
    phoneNumber: Number
});

const genereSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});
const Movies = new mongoose.Schema({
    title : String,
    numberInStock : Number,
    dailyRentalRate : Number,
    genere : genereSchema,
    name: String,
    bio: String,
    website: String
});
const Genere = mongoose.model('genere', genereSchema);

const schema = new mongoose.Schema({
    RentalSDate :{
        type : Date,
        default : Date.now()
    },
    RentalEDate :{
        type:Date,
        
    },
    movie : Movies, 
    
});

const Movie = mongoose.model('movies', schema);