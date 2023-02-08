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
mongoose.connect('mongodb://127.0.0.1:27017/machines')
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.log('could not connect to MongoDB', err));

const machineSchema = new mongoose.Schema({
    //validation is only meaningful in mongoose
    //mongodb doesnot have this validation ]]]
    name: { type: String, required: true },
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
        // name: 'Kent5',
        manufacturer: 'Kent',
        tags: ['electro'],
        isStandard: true
    });

    try {
        const result = await machine.validate();
        // result returns a promise of void
        // not ideal

        //so we need to use a callback
        // machine.validate((err) => {
        //     if (err) { }
        // })


        // const result = await machine.save();
        // console.log(result);
    }
    catch (ex) {
        console.log(ex.message);
    }
}
createMachine();    