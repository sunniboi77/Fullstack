//  Async validator
// const { number } = require(joi);
// Collection imported in Mongoshell is imported properly 
const mongoose = require('mongoose');

const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const Schema = mongoose.Schema;
// run debugger
// $env:DEBUG='app:db'; node xyz.js
// $env:DEBUG='app:db';node index2.js

dbDebugger('Connected to database...');

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

//create Schema for imported collection; 
const tecaMachineSchema = new Schema({
    id: Number,
    // NAME: String,
    // SYSTEM: String,
    // COLOR: Number,
    // DRIVE: String,
    // CYCLES: Number,
    // Force: Number
},
    { collection: 'TecaMachines' }
);   // collection name


//Schema validation for machines 
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
        enum: ['pad', 'fast', 'small'],
        lowercase: true,
        trim: true //paddings will be removed by mongoose
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
    //because arrow function does not have their own this
    //it will refer to the calling functions variables 
    //there is not defined
    price: {
        type: Number,
        required: function () { return this.isStandard },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

//Classes, objects
//Course is a Class
const Machine = mongoose.model('machines', machineSchema);
const TecaMachine = mongoose.model('TecaMachine', tecaMachineSchema);

async function createMachine() {
    const machine = new Machine({
        name: 'Kent9',
        category: 'PAD',
        manufacturer: 'Kent',
        tags: ["pad"],
        isStandard: true,
        price: 150.1
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




// Uses collection TecaMachine
async function getMachines() {
    dbDebugger('query runs');

    const machines2 = await TecaMachine.find()
    console.log(machines2);
    // .or([{ manufacturer: 'Kent' }, { manufacturer: 'Morlock' }]);
}

async function getMachines() {
    dbDebugger('query runs');

    const machines4 = await Machine
        // .find()
        .find({ _id: "63e209e802382954f876e2af" })
        .sort({ name: 1 })
        .select({ name: 1, manufacturer: 1 })
    console.log(machines4[0].name);

    // .or([{ manufacturer: 'Kent' }, { manufacturer: 'Morlock' }]);
}

// Uses collection machines 
async function getMachinesCount() {
    dbDebugger('getMachinesCount query runs');
    const machines3 = await Machine
        // .find({ manufacturer: /.*Prin.*/i })
        .count()
    console.log('nr of machines found:', machines3);
}

getMachinesCount()
// createMachine();
getMachines() 