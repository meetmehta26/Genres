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
router.delete('/:id', async(req, res) => {
    const genere= await Genere.findByIdAndRemove(req.params.id,);
    if (!genere) { return res.status(404).send('Resource Not found'); }
    res.status(200).send(genere);
})
router.get('/:id', async(req, res) => {
    // const genere = generes.find(s => s.id === parseInt(req.params.id));
    const genere= await Genere.findById(req.params.id)
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