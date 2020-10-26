const router = require('express').Router();
const {Genere,validate,createData}= require('../models/genere')


router.get('/', async (req, res) => {
    const generes = await Genere.find();
    res.status(200).send(generes);
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    const data = await createData(req.body.name)
    res.status(200).send(data);
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    const genere = await Genere.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!genere) { return res.status(404).send('Resource Not found'); }
    const result = await genere.save();
    res.status(200).send(result);
})
router.delete('/:id', async (req, res) => {
    const genere = await Genere.findByIdAndRemove(req.params.id,);
    if (!genere) { return res.status(404).send('Resource Not found'); }
    res.status(200).send(genere);
})
router.get('/:id', async (req, res) => {
    // const genere = generes.find(s => s.id === parseInt(req.params.id));
    const genere = await Genere.findById(req.params.id)
    if (!genere) { return res.status(404).send('Resource Not found'); }
    res.status(200).send(genere);
})



module.exports = router;