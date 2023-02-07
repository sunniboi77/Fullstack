
const c = require("config");
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
        .find({ manufacturer: /.*Prin.*/i })
        .count()

    console.log('nr of machines found:', machines3);
}

getMachines();



async function updateMachines(_id) {

    // approach 1: Query first
    // findById()
    // modify
    // save()

    //approach 2: Update first
    // Update directly
    // Optional: get the updated document

    // approach 1
    const machine = await Machines.findById(_id);
    if (!machine) return;
    //in case we dont want to change something, we can build in logic
    if (machine.isStandard) return;

    machine.isStandard = true;
    machine.printSize = 100;
    machine.tags = ['small'];

    const result = await machine.save()
    console.log(result);


    //  Approach2
    // machines.set({
    //     isStandard: false,
    //     manufacturer: 'Kent'
    // })
    // machine.save();
}

updateMachines('63e0fe030b6e651b83cf7e2c');
