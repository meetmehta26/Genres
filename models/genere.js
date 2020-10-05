const Joi = require('@hapi/joi');
const mongoose = require('mongoose');



const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
})
const Genere = mongoose.model('generes', schema);
async function createData(name1) {
    const genere = Genere({
        name: name1
    })
    const result = await genere.save();
    console.log(result);
    return result;
}
function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(5).required()
    }
    console.log(genre, "typeof", typeof (genre));
    return Joi.validate(genre, schema);

}

exports.Genere=Genere;
exports.validate= validateGenre;
exports.createData=createData;