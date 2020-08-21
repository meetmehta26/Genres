const express = require('express');
const Joi = require('@hapi/joi')
const app = express();
app.use(express.json());

var generes = [
    { id: 1, name: "generes1" },
    { id: 2, name: "generes2" },
    { id: 3, name: "generes3" },
    { id: 4, name: "generes4" },
]

app.get('/api/generes', (req, res) => {
    res.status(200).send(generes);
})

app.post('/api/generes',  (req, res) => {
    const {error} =  validateGenre(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    const genere = {
        id: generes.length + 1,
        name: req.body.name
    }
    generes.push(genere);
    res.status(200).send(genere);
})

app.put('/api/generes/:id', (req, res) => {
    const genere = generes.find(s => s.id === parseInt(req.params.id));
    if (!genere) { return res.status(404).send('Resource Not found'); }
    const { error } = validateGenre(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    genere.name = req.body.name;
    res.status(200).send(genere);
})
app.delete('/api/generes/:id',(req,res)=>{
    const genere = generes.find(s => s.id === parseInt(req.params.id));
    if (!genere) { return res.status(404).send('Resource Not found'); }
    const index = generes.indexOf(genere);
    generes.splice(index,1);
    res.send(genere);
})
app.get('/api/generes/:id', (req, res) => {
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
var port = process.env.PORT|| 8000;
console.log(port);
app.listen(port,()=>console.log(`Listening at port ${port}`));