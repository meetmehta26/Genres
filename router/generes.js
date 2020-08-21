const router = require('express').Router();
const Joi = require('@hapi/joi')

var generes = [
    { id: 1, name: "generes1" },
    { id: 2, name: "generes2" },
    { id: 3, name: "generes3" },
    { id: 4, name: "generes4" },
]

router.get('/', (req, res) => {
    res.status(200).send(generes);
})

router.post('/',  (req, res) => {
    const {error} =  validateGenre(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    const genere = {
        id: generes.length + 1,
        name: req.body.name
    }
    generes.push(genere);
    res.status(200).send(genere);
})

router.put('/:id', (req, res) => {
    const genere = generes.find(s => s.id === parseInt(req.params.id));
    if (!genere) { return res.status(404).send('Resource Not found'); }
    const { error } = validateGenre(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    genere.name = req.body.name;
    res.status(200).send(genere);
})
router.delete('/:id',(req,res)=>{
    const genere = generes.find(s => s.id === parseInt(req.params.id));
    if (!genere) { return res.status(404).send('Resource Not found'); }
    const index = generes.indexOf(genere);
    generes.splice(index,1);
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
    console.log(genre,"typeof",typeof(genre));
    return Joi.validate(genre,schema );

}

module.exports = router;