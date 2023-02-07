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


//update 2
async function updateMachines(id) {
    const result = await Machines.updateOne(
        { _id: id }, {
        $set: {
            manufacturer: "Test 2"
        }
    });
    const machine = await Machines.findByIdAndUpdate(id, {
        $set: {
            isStandard: true
        }
    }, { new: true });
    // check if course exists
    // if (!machine) return;
    //in case we dont want to change something, we can build in logic
    console.log(result, machine);
}

updateMachines('63e1002cd7309fa6b1175106');
