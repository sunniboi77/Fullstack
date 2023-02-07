// 11 Queries with regexp
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
    dbDebugger('query runs');

    // query 3
    const machines3 = await Machines

        //start with Ke
        // .find({ manufacturer: /^Ta/ })
        // // Ends with Print, i means it is case-INsensitive   
        // .find({ manufacturer: /Print$/i })

        //cointains text 
        //.* means zero or more characters before and after this text, 
        //case insensitive : put i at the end 
        .find({ manufacturer: /.*Ken.*/i })
    console.log(machines3);
}

getMachines();