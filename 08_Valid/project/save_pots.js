const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/machines')
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.log('could not connect to MongoDB', err));

const potSchema = new mongoose.Schema({
    size: Number,
    manufacturer: String
});

const potsData = [
    { size: 56, manufacturer: "TP" },
    { size: 72, manufacturer: "TP" },
    { size: 86, manufacturer: "TP" },
    { size: 96, manufacturer: "TP" },
    { size: 115, manufacturer: "TP" },
    { size: 130, manufacturer: "TP" },
    { size: 160, manufacturer: "TP" },
    { size: 195, manufacturer: "TP" },
];

const Pot = mongoose.model('pots', potSchema)

async function createPots() {
    for (const potData of potsData) {
        const pot = new Pot(potData);
        await pot.save();
        console.log(pot);
    }
}

// createPots();
