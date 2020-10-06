const Joi = require('@hapi/joi')
const mongoose = require('mongoose');

const genereSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});
const Genere = mongoose.model('genere', genereSchema);

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    genere: genereSchema,
    numberInStock: {
        type: Number,
        required: true,
    },
    dailyRentalRate: {
        type: Number,
        required: true,

    }
});

const Movie = mongoose.model('movies', schema);

async function createData(body) {
    const movie = Movie({
        title :body.title,
        'genere.name': body.genere.name,
        numberInStock : body.numberInStock,
        dailyRentalRate : body.dailyRentalRate
    })
    const result = await movie.save();
    console.log(result);
    return result;
}

function validateGenre(movie) {
    const schema = {
        title: Joi.string().min(5),
        genere: Joi.object(),
        dailyRentalRate: Joi.number().min(0),
        numberInStock: Joi.number().min(0),
    }
    return Joi.validate(movie, schema);

}

exports.Movie = Movie;
exports.validate = validateGenre;
exports.createData = createData;