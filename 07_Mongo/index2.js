
// Create queries, list operators for mongod queries 
const { number } = require("joi");
const mongoose = require('mongoose');

const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');


dbDebugger('Connected to database...');
dbDebugger('Debugger workingmongmo..');
//hardcoded - this returns a promise
mongoose.connect('mongodb://127.0.0.1:27017/machines')
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.log('could not connect to MongoDB', err));



const machineSchema = new mongoose.Schema({
    name: String,
    manufacturer: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isStandard: Boolean
});


async function getMachines() {

    // Operators
    //eq ()
    //ne (not equal)
    //gt (greater than)
    //gte (greater than or equal to)
    //lt (less than)
    //lte (less than or equal to)
    //in nin (not in)

    //Logical operators
    //or 
    //and 

    //get All 
    // const machines = await Machines.find()
    // console.log(machines);

    dbDebugger('query runs');

    const machines2 = await Machines
        // .find({ manufacturer: 'Teca-Print' })
        // .find({ price: { 10 } }) - exact value is 10
        // .find({ price: { $gte: 10, $lte: 20 } })

        // query 2 
        // .find({ price: { $in: [10, 15, 30] } }) // find multiple values with an array
        // .limit(10)
        // .sort({ name: 1 })
        // .select({ name: 1, tags: 1 })

        // query 3
        .find()
        .or([{ manufacturer: 'Kent' }, { manufacturer: 'Morlock' }]);
    console.log(machines2);
}

getMachines();