const Joi = require('joi');
//import log function from logger.js
const logger = require('./logger')
const express = require('express');
const app = express();


//this middleware returns a function
//read the request 
//sets req.body
app.use(express.json());

app.use(logger);

const { result } = require("underscore");


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


const courses = [
    { id: 1, name: 'course 1 ' },
    { id: 2, name: 'course 2 ' },
    { id: 3, name: 'course 3 ' },
];

app.get('/', (req, res) => {
    res.send('HELLO WORLD!!1111');
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

 