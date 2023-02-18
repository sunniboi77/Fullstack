const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path');
const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
process.env.NODE_ENV = 'development';


// const public = readFile(path.resolve(__dirname, './content/first.txt'));

// run debugger
// $env: DEBUG = 'app:db'; node xyz.js
// $env:DEBUG='app:db';node index.js

// $env:DEBUG='app:startup';node index.js

// cd "d:\Github\11_FirstApp\05_Restful_Middleware\"
// run code from Powershell
//configuration 
console.log('application name:' + config.get('name'));
console.log('mail server:' + config.get('mail.host'));
console.log('mail password:' + config.get('mail.password'));


const Joi = require('joi');
// import log function from logger.js
const logger = require('./middleware/logger')
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');


// Environments
console.log(`NODE ENV:${process.env.NODE_ENV}`);
console.log(`app:${app.get('env')}`);


if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger("Using morgan...")
}
app.use(express());
app.use(helmet());
app.use(morgan('tiny'));

//this middleware returns a function
//read the request 
//sets req.body
app.use(express.json());

//key=value
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(__dirname + '/public'));

app.use(express.static('public'))
app.use('/static', express.static(__dirname + '/public'));

app.use(logger);

const { result } = require("underscore");


// middleware called in sequence
// each middleware to separate function
// this is not used anymore since it is exported from middleware
// app.use(function (req, res, next) {
//     console.log('logging...');
//     next();
// })

app.use(function (req, res, next) {
    console.log('Authenticating...');
    next();
})


const courses = [
    { id: 1, name: 'course 1 ' },
    { id: 2, name: 'course 2 ' },
    { id: 3, name: 'course 3 ' },
];

app.get('/', (req, res) => {
    startupDebugger("getviewcalled");
    res.render('index', { title: "My Express App", message: "Hello world" });
})

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id)
})

//multiple parameters results :
// {"year":"2022","month":"12"}
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params)
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send("the course with the given id was not found")
    res.send(course);
})

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body); //result.error
    if (error) {
        return res.status(400).send(error.details[0]);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send({ error, course });
});

app.put('/api/courses/:id', (req, res) => {
    // look up course
    // if not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        return res.status(404).send("the course with the given id was not found")
    }

    // validate
    // if invalid, return 400 - Bad request
    const { error } = validateCourse(req.body); //result.error
    if (error) {
        res.status(400).send(error.details[0]);
        return;
    }
    // update course
    // return updated course 
    course.name = req.body.name;
    res.send(course);
})

app.delete('/api/courses/:id', (req, res) => {
    //look up the course
    //not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send("the course with the given id was not found")

    //delete 
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
    //return the same course 

})

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const validation = schema.validate(course);
    return validation;
}

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));

