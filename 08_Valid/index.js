
//playfile - this was a test runned by me, 
//shall be deleted later

const mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("machines");
    var myobj = { name: "Company Inc", address: "Highway 37" };
    dbo.collection("customers").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});

const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     console.log("Connected to the database!");
// });


const machineSchema = new mongoose.Schema({
    id: Number,
    NAME: String,
    SYSTEM: String,
    COLOR: Number,
    DRIVE: String,
    Force: String
});


const TecaMaschines1 = mongoose.model('machines', machineSchema);

TecaMaschines1.find({}, function (err, collections) {
    if (err) return console.error(err);
    console.log(collections);
});