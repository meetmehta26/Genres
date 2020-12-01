const router = require('express').Router();
const {Rental,validate,createData}= require('../models/rental.js')
const auth = require('../middleware/auth')


router.get('/',auth, async (req, res) => {
    const rentals = await Rental.find();
    res.status(200).send(rentals);
})

router.post('/', auth,async (req, res) => {
    const { error } = validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    const data = await createData(req.body)
    res.status(200).send(data);
})

router.put('/:id', auth,async (req, res) => {
    const { error } = validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    const rentals = await Rental.findByIdAndUpdate(req.params.id, { ["genere.name"]: req.body.genere.name }, { new: true })
    console.log("movieeeeeeee:::::",rentals)
    if (!rentals) { return res.status(404).send('Resource Not found'); }
    const result = await rentals.save();
    res.status(200).send(result);
})
router.delete('/:id', auth,async (req, res) => {
    const rentals = await Rental.findByIdAndRemove(req.params.id,);
    if (!rentals) { return res.status(404).send('Resource Not found'); }
    res.status(200).send(rentals);
})
router.get('/:id',auth, async (req, res) => {
    // const rentals = movies.find(s => s.id === parseInt(req.params.id));
    const rentals = await Rental.findById(req.params.id)
    if (!rentals) { return res.status(404).send('Resource Not found'); }
    res.status(200).send(rentals);
})



module.exports = router;