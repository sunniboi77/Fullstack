//Create mongodb schema and save objects 
const { number, object } = require("joi");
const mongoose = require('mongoose');

const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
// run debugger
// $env:DEBUG='app:db'; node xyz.js
// $env:DEBUG='app:db';node index2.js

dbDebugger('Connected to database...');
dbDebugger('Debugger working mongo..');
//hardcoded - this returns a promise

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('connected to MongoDB...'))
    .catch(err => console.log('could not connect'))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

//create Course is class
const Course = mongoose.model('Course', courseSchema);
//Create object
const course = new Course({
    name: 'Node.js Course',
    author: 'Mosh',
    tags: ['node', 'backend'],
    isPublished: true
});

//schema -> model -> class -> object -> document

