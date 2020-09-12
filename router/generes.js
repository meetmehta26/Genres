const router = require('express').Router();
const Joi = require('@hapi/joi')
const mongoose = require('mongoose');



const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 50
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
// async function findbyID(){
//     const Genere = mongoose.model('generes', schema);
//     const genere = Genere({
//         name: name1
//     })
//     const result=await genere.save();
//     console.log(result);
//     return result;

// }




// var generes = [
//     { id: 1, name: "generes1" },
//     { id: 2, name: "generes2" },
//     { id: 3, name: "generes3" },
//     { id: 4, name: "generes4" },
// ]

router.get('/', async (req, res) => {
    const generes = await Genere.find();
    res.status(200).send(generes);
})

router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    const data = await createData(req.body.name)
    console.log("DATA", data);
    res.status(200).send("Successfully added the data");
})

router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    const genere = await Genere.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!genere) { return res.status(404).send('Resource Not found'); }
    const result = await genere.save();
    res.status(200).send(result);
})
router.delete('/:id', (req, res) => {
    const genere = generes.find(s => s.id === parseInt(req.params.id));
    if (!genere) { return res.status(404).send('Resource Not found'); }
    const index = generes.indexOf(genere);
    generes.splice(index, 1);
    res.send(genere);
})
router.get('/:id', (req, res) => {
    const genere = generes.find(s => s.id === parseInt(req.params.id));
    if (!genere) { return res.status(404).send('Resource Not found'); }
    res.status(200).send(genere);
})

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(5).required()
    }
    console.log(genre, "typeof", typeof (genre));
    return Joi.validate(genre, schema);

}

module.exports = router;