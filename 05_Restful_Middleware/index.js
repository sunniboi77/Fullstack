const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path');
const config = require('config');
const startupDebugger = require('debug')('app:startup');
const Joi = require('joi');
// import log function from logger.js
const logger = require('./middleware/logger')
const express = require('express');
const courses = require('./routes/courses');
const startpage = require('./routes/startpage')

const app = express()
const { result } = require("underscore");

process.env.NODE_ENV = 'development';
const dbDebugger = require('debug')('app:db');

app.use(express());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(express.json());

// app.use(express.static(__dirname + '/public'));
app.use(express.static('public'))
app.use('/static', express.static(__dirname + '/public'));

// const public = readFile(path.resolve(__dirname, './content/first.txt'));
// run debugger
// $env: DEBUG = 'app:db'; node xyz.js
// $env:DEBUG='app:db';node index.js

// $env:DEBUG='app:startup';node index.js

// cd "d:\Github\11_FirstApp\05_Restful_Middleware\"
// run code from Powershell

//configuration 
// console.log('application name:' + config.get('name'));


app.set('view engine', 'pug');
app.set('views', './05_Restful_Middleware/views');

// const coursesRouter = require('./courses');
// app.use('/api/courses', coursesRouter);


const myModule = require(path.join(__dirname, 'routes', 'courses.js'));

console.log(path.sep);

const filePath = path.join(__dirname, '/courses');
console.log(filePath);

const base = path.basename(filePath);
// logs the file in the filepath
console.log('base', base);

//any routes starts with api/courses use module courses 
app.use('/api/courses', courses);
app.use('/', startpage);


// Environments
console.log(`NODE ENV:${process.env.NODE_ENV}`);
console.log(`app:${app.get('env')}`);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger("Using morgan...")
}

app.use(function (req, res, next) {
    console.log('Authenticating...');
    next();
})




//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));

