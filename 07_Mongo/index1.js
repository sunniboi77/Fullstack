//Create mongodb schema and save objects 

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
//Course is a Class
const Course = mongoose.model('machines', machineSchema)

async function createCourse() {
    const course = new Course({
        name: 'Kent1',
        manufacturer: 'Kent',
        tags: ['electro'],
        isStandard: true
    });

    const result = await course.save();
    console.log(result);
}
createCourse();