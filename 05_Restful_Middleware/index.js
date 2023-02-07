const Joi = require('joi');

// namespace to be used os startupDebugger
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const morgan = require('morgan');
const helmet = require('helmet');

//require courses module and store it in const courses
const courses = require('./routes/courses');
const startpage = require('./routes/startpage');

//import log function from logger.js
const logger = require('./middleware/logger')
const express = require('express');

const app = express();

//in node we will not use views directly 
app.set('view engine', 'pug');
app.set('views', './views');

//Configuration 
// console.log('Application Name' + config.get('name'));
// console.log('Mail Server Name' + config.get('mail.host'));


// console.log('Mail Password:' + config.get('mail.password'));

// This is how we get the environment used 
// console.log(`NODE_ENV:${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

//this middleware returns a function
//read the request 
//sets req.body
app.use(express.json());

//when the module is called supply 2 parameters
//routes and which router to use 
app.use('/api/courses', courses);
app.use('/', startpage);

app.use(express.urlencoded({ extended: true })); // key=value&key=value
app.use(express.static('public'))
app.use(helmet());
app.use(logger);


//With console.log
console.log(` from clg = NODE_ENV: ${process.env.NODE_ENV}`);
app.get(`app: ${app.get('env')}`);

//important !!! this is how to change the environments in powershell 
//$env:NODE_ENV="production"

//using console.log 
// if (app.get('env') === 'development') {
//     app.use(morgan('tiny'))
//     console.log('Morgan enabled....');
// }


// set DEBUG=*,-not_this

// db. work ... -with debugger
dbDebugger('Connected to database...');
dbDebugger('Connected to downloading...');


// With debugger
// 08 debugging
// set in package.json start to: 
// "start": "set DEBUG=app:startup & node 05_Restful_Middleware/index.js",
// run npm start 
if (app.get('env') === 'development') {
    startupDebugger('Morgan enabled...');
    app.use(morgan('tiny'));
    console.log(`from clg2= NODE_ENV: ${process.env.NODE_ENV}`);
}

//middleware called in sequence
//each middleware to separate function
app.use(function (req, res, next) {
    console.log('logging...');
    next();
})

app.use(function (req, res, next) {
    console.log('Authenticating...');
    next();
})

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));

