const router = require('express').Router();
const {User,validate,}= require('../models/user')


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }

    let user = await User.findOne({email : req.body.email});
    if(user){
        return res.status(400).send('User already exists');    
    }
    user = new User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,

    })
    const salt = await bcrypt.genSaltSync(10);
    const hashed = await bcrypt.hash(user.password,salt);
    user.password=  hashed;
    await user.save();
   
    res.status(200).send(user);
})

module.exports = router;