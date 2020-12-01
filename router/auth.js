const jwt = require('jsonwebtoken');
require("dotenv").config()
const router = require('express').Router();
const { User } = require('../models/user')
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const Joi = require('@hapi/joi');



router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Invalid email or password.');
    }
    const validPassword =bcrypt.compare(req.body.password,user.password)
    if(!validPassword){
        return res.status(400).send('Invalid email or password.');
    }
    const token = user.generateAuthenticationToken()

    res.status(200).send(token);
})
function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(250).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    }
    return Joi.validate(req, schema);

}
module.exports = router;