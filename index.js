const express = require('express');
const Joi = require('@hapi/joi')
const generes = require('./router/generes');
const app = express();





app.use(express.json());
app.use('/api/generes',generes);


var port = process.env.PORT|| 8000;
console.log(port);
app.listen(port,()=>console.log(`Listening at port ${port}`));