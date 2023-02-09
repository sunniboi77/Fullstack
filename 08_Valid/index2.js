//  Video 4
//  Async validator

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


//to simulate setTimeOut function 
// await delay(3);
const delay = (n) => {
    return new Promise(function (resolve) {
        setTimeout(resolve, n * 1000);
    });
};


//console.log function 
const cl = (...args) => console.log(...args);
cl("hello")

const machineSchema = new mongoose.Schema({
    //validation is only meaningful in mongoose
    //mongodb doesnot have this validation 
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /regexp patter/
    },
    category: {
        type: String,
        required: true,
        enum: ['big', 'small', 'medicine']
    },
    manufacturer: String,
    tags: {
        type: Array,
        //custom validator with a function
        //min one tag and not null, not an empty array
        // Async validator 
        validate: {
            validator: function (v) {
                return new Promise((res, rej) => {
                    setTimeout(() => {
                        // do some async work
                        const result = v && v.length > 0;
                        res(result)
                    }, 200);
                });
            },
            message: 'a course should have at least one tag'
        }
    },
    date: { type: Date, default: Date.now },
    isStandard: Boolean,

    //price is required if machine is standard 
    //note the function cannot be arrow function
    //because arrow function does not have their own "this"
    //it will refer to the calling functions variables 
    //there is not defined
    price: {
        type: Number,
        required: function () { return this.isStandard },
        min: 10,
        max: 200
    }
});

//Classes, objects
//Course is a Class
const Machine = mongoose.model('machines', machineSchema)

async function createMachine() {
    const machine = new Machine({
        name: 'Kent6',
        category: '-',
        manufacturer: 'Kent',
        tags: [],
        isStandard: true,
        price: 150
    });

    try {
        const result = await machine.validate();
        // result returns a promise of void
        // not ideal

        //so we need to use a callback
        // machine.validate((err) => {
        //     if (err) { }
        // })

        const result2 = await machine.save();
        console.log(result2);
    }


    catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

createMachine();    