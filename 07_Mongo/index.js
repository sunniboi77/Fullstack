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
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // match : /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        // lowercase: true,
        uppercase: true,
        trim: true // remove spaces 
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: async function (v) {
                const result = await new Promise(resolve => {
                    setTimeout(() => {
                        //Do some async work 
                        const isValid = v && v.length > 0;
                        resolve(isValid);
                    }, 2000);
                });
                return result;
            },
            message: 'course should have at least one tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    //function validator below
    price: {
        type: Number,
        required: function () { return this.isPublished },
        min: 10,
        max: 120,
        get: v => Math.round(v), // read value of property already imported or existing in the database 
        set: v => Math.round(v) // when we create the value  
    }
});

//schema -> model -> class -> object -> document
const Course = mongoose.model('Course', courseSchema);

//create Course is class
async function createCourse() {
    //Create object
    const course = new Course({
        name: 'JS/CSS Course',
        category: 'web',
        author: 'ATTILA',
        tags: ['cool'],
        isPublished: true,
        price: 15
    });
    try {
        await course.validate();
        const result = await course.save();
        // console.log(result);
    }
    catch (ex) {
        console.log("message ==>", ex.message);
        //remove tags and set category to '-'
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

//filter courses 
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

//get all courses
async function getCourses2() {
    const courses = await Course
        .find()
        //limit page Size
        // .skip((pageNumber - 1) * pageSize)
        // .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1, author: 1 })
    console.log(courses);
}

//count courses
async function countCourses() {
    // const courses = await Course.find({ author: 'Mosh', isPublished: true })
    const courses = await Course
        .find({ author: 'Mosh' })
        .count()
    console.log("counted -->>", courses);
}

async function updateCourseExamepleMethods(id) {
    //approach query first
    //findById()
    //Modify its properties
    // save()

    // approach update first
    // update directly
    // optionally get the document 
}

//Query First Approach
async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;

    course.isPublished = true;
    course.author = 'Another Author'

    // Method #2 with set method
    //  course.set({isPublished:true,author:'another author'})

    const result = await course.save();
    console.log(result);
}

//Update First Approach
async function updateCourse2(id) {
    const result = await Course.updateOne({ _id: id }, {
        $set: {
            author: 'Attila changed',
            isPublished: false
        }
    });
    console.log(result);
}


//Update First Approach #2 with findById...
async function updateCourse3(id) {
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'old',
            isPublished: true
        }
    }, { new: true }); //with this we get the updated result, not the one before modification
    console.log(course);
}

async function removeCourse(id) {
    // Course.deleteOne({isPublished:false}) //delete 1st and stops 
    //Course.findByIdandRemove(id) // this is  

    const result = await Course.deleteOne({ _id: id })

    console.log(result);
}


// removeCourse('63fb29a9d560d6b86f227f29');
// updateCourse('63fa2e6ece46ddfc1c3aaa72');
// updateCourse3('63fb29a9d560d6b86f227f29');
createCourse();
// countCourses();
// getCourses2();