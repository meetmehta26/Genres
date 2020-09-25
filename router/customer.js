const router = require('express').Router();
const Joi = require('@hapi/joi')
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    isGold:{
        type: Boolean,
        required :true,
    },
    phoneNumber:{
        type:Number,
        required:true,
        min:1000000000,
        maxlength:9999999999,

    }
})

const Customer = mongoose.model('customer', schema);

router.get('/',async(req,res)=>{
    const customer = await Customer.find();
    if(!customer){return res.status(404).send("No data found")}

    res.send(customer);


})

router.post('/',async(req,res)=>{
    const { error } = validateGenre(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    const customer = Customer({
        name:req.body.name,
        isGold:req.body.isGold,
        phoneNumber:req.body.phoneNumber
    })

    const result =await customer.save();
    res.status(200).send(result);

})

router.put('/:id',async(req,res)=>{
    const { error } = validateGenre(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    const cutomer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })

    if(!customer)return res.status(404).send('Resource Not Found');
    const result =await customer.save();
    res.status(200).send(customer);

})

router.delete('/:id',async(req,res)=>{
    // const { error } = validateGenre(req.body);
    // if (error) { return res.status(400).send(error.details[0].message) }
    const customer = await Customer.findByIdAndRemove(req.params.id)

    if(!customer)return res.status(404).send('Resource Not Found');
    res.status(200).send(customer);

})



function validateGenre(customer){
    const schema={
        name : Joi.string().min(5).required(),
        phoneNumber : Joi.number().integer().min(1000000000).max(9999999999).required(),
        isGold:Joi.boolean().required()
    }
    return Joi.validate(customer, schema);

}


module.exports=router;