//Create mongodb schema and save objects 
const { number } = require("joi");
const mongoose = require('mongoose');

const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
// run debugger
// $env:DEBUG='app:db'; node xyz.js
// $env:DEBUG='app:db';node index2.js

dbDebugger('Connected to database...');
dbDebugger('Debugger workingmongmo..');
//hardcoded - this returns a promise

const machineSchema = new mongoose.Schema({
    name: String,
    manufacturer: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isStandard: Boolean
});
  

//Classes, objects
//Course is a Class
const Machine = mongoose.model('machines', machineSchema)

async function createMachine() {
    const machine = new Machine({
        name: 'Kent5',
        manufacturer: 'Kent',
        tags: ['electro'],
        isStandard: true
    });

    const result = await machine.save();
    console.log(result);
}
createMachine();