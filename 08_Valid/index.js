//this is for the genres api 
const mongoose = require('mongoose');
const Joi = require('joi');
const { result } = require("underscore");
const genres = require('./routes/genres.js');
const express = require('express');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/machines')
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.log('could not connect to MongoDB', err));

app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
// app.get('/', (req, res) => {
//     res.send('HELLO WORLD!');
// })
