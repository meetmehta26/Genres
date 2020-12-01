const router = require('express').Router();
const {Customer,validate} = require('../models/customer')
const auth = require('../middleware/auth')



router.get('/', auth,async (req, res) => {
    const customer = await Customer.find().sort('name');
    if (!customer) { return res.status(404).send("No data found") }

    res.send(customer);


})

router.post('/', auth,async (req, res) => {
    const { error } = validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    const customer = Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phoneNumber: req.body.phoneNumber
    })

    const result = await customer.save();
    res.status(200).send(result);

})

router.put('/:id', auth,async (req, res) => {
    const { error } = validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    const cutomer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })

    if (!customer) return res.status(404).send('Resource Not Found');
    const result = await customer.save();
    res.status(200).send(customer);

})

router.delete('/:id', auth,async (req, res) => {
    // const { error } = validateGenre(req.body);
    // if (error) { return res.status(400).send(error.details[0].message) }
    const customer = await Customer.findByIdAndRemove(req.params.id)

    if (!customer) return res.status(404).send('Resource Not Found');
    res.status(200).send(customer);

})

module.exports = router;