const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/machines')
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.log('could not connect to MongoDB', err));

const potSchema = new mongoose.Schema({
    size: Number,
    manufacturer: String
});

const Pot = mongoose.model('pots', potSchema)

async function getPots() {
    const pots = await Pot
        .find()
    console.log(pots);
}

getPots();