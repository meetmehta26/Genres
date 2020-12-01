const router = require('express').Router();
require("dotenv").config()
const jwt = require('jsonwebtoken');
const {User,validate}= require('../models/user')
const bcrypt = require ('bcryptjs');
const _ = require('lodash');



router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }

    let user = await User.findOne({email : req.body.email});
    if(user){
        return res.status(400).send('User already exists');    
    }
    const salt = await bcrypt.genSaltSync(10);
    const hashed = await bcrypt.hash(req.body.password,salt);
    user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashed,

    })
    await user.save();
    const token = user.generateAuthenticationToken()
   
    res.status(200).header('x-auth-token', token).send(_.pick(user,['_id','name','email']));
})

module.exports = router;