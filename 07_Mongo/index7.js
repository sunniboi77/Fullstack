//delete function

const c = require("config");
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

//Classes, objects
//Maschines is a Class
const Machines = mongoose.model('machines', machineSchema)

// async function getMachines() {
//     dbDebugger('query runs');

//     // query 3
//     const machines3 = await Machines
//         .find({ manufacturer: /.*Prin.*/i })
//         .count()

//     console.log('nr of machines found:', machines3);
// }

// getMachines();


async function removeMachine(id) {
    //remove 1 document
    //deleteOne finds the 1st document and deletes that
    //     // const remove = await Machines.deleteOne({ _id: id });

    // deleteMany 
    // const machineremoved = await Machines.deleteMany({ _id: id });

    // findbyIdAndRemove will delete and show the delete item
    // if document was already deleted or can not find it returns the value null 
    const machineremoved = await Machines.findByIdAndRemove(id);
    console.log(machineremoved);
    // }
    // removeMachine('');

}
removeMachine('63e1002cd7309fa6b1175106');
