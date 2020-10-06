const router = require('express').Router();
const {Movie,validate,createData}= require('../models/movie.js')


router.get('/', async (req, res) => {
    const movies = await Movie.find();
    res.status(200).send(movies);
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    const data = await createData(req.body)
    res.status(200).send(data);
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    const movie = await Movie.findByIdAndUpdate(req.params.id, { ["genere.name"]: req.body.genere.name }, { new: true })
    console.log("movieeeeeeee:::::",movie)
    if (!movie) { return res.status(404).send('Resource Not found'); }
    const result = await movie.save();
    res.status(200).send(result);
})
router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id,);
    if (!movie) { return res.status(404).send('Resource Not found'); }
    res.status(200).send(movie);
})
router.get('/:id', async (req, res) => {
    // const movie = movies.find(s => s.id === parseInt(req.params.id));
    const movie = await Movie.findById(req.params.id)
    if (!movie) { return res.status(404).send('Resource Not found'); }
    res.status(200).send(movie);
})



module.exports = router;