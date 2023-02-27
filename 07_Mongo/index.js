//Create mongodb schema and save objects 
const { number, object } = require("joi");
const mongoose = require('mongoose');
const { create } = require("underscore");

const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
// run debugger
// $env:DEBUG='app:db'; node xyz.js
// $env:DEBUG='app:db';node index2.js

dbDebugger('Connected to database...');
dbDebugger('Debugger working mongo..');
//hardcoded - this returns a promise

mongoose.connect('mongodb://127.0.0.1:27017/playground')
    .then(() => console.log('connected to MongoDB...'))
    .catch(err => console.log('could not connect'))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

//schema -> model -> class -> object -> document
const Course = mongoose.model('Course', courseSchema);

//create Course is class
async function createCourse() {
    //Create object
    const course = new Course({
        name: 'Node.js Course',
        author: 'Mosh',
        tags: ['node', 'backend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;
    const courses = await Course
        .find({ price: { $gt: 10 } })
        .or([{ author: 'Mosh' }, { isPublished: true }])
        //limit page Size
        // .skip((pageNumber - 1) * pageSize)
        // .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })
    console.log(courses);
}

async function countCourses() {
    // const courses = await Course.find({ author: 'Mosh', isPublished: true })
    const courses = await Course
        .find({ author: 'Mosh' })
        .count()
    console.log("counted -->>", courses);
}


createCourse();

countCourses();

getCourses()