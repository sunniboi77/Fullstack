const express = require('express');
const logger = require('./middleware/logger');
const authentication = require('./middleware/authentication');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const genres = require('./routes/genres')


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger);
app.use(authentication);
app.use('/api/genres', genres.router);
// app.use('/api/genres', genres);


mongoose.connect('mongodb://127.0.0.1:27017/vidli')
    .then(() => console.log('connected to MongoDB...'))
    .catch(err => console.log('could not connect'))


const port = process.env.PORT_NUMBER || 3000;
app.listen(port, () => console.log('Listening on port', port, '...')); 