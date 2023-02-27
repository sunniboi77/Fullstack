// 11 Queries with regexp
// pagination to be checked
const { number } = require("joi");
const mongoose = require('mongoose');

const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
// run debugger
// $env:DEBUG='app:db'; node xyz.js
// $env:DEBUG='app:db';node index_2.js

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


//Classes, objects
//Maschines is a Class
const Machines = mongoose.model('machines', machineSchema)

async function getMachines() {
    const pageNumber = 2;
    const pageSize = 10;
    dbDebugger('query runs');

    // with this we can get our documents on a given page 
    // check this out later 
    const machines5 = await Machines
        .find({ manufacturer: /.*Prin.*/i })
        .skip((pageNumber - 1) * pageSize)
        .limit((pageSize))
    console.log(machines5);
}

getMachines();


