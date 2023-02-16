const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const config = require('config');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // default template path is ./views so this is redundant


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

// console.log('Application Name:', config.get('name'));
// console.log('Mail Server:', config.get('mail.host'));
// console.log('Mail Password:', config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger("Using morgan...")
}

dbDebugger("Connected to the database")

const courses = [{ id: 1, name: 'Mathematics' }, { id: 2, name: 'English' },
{ id: 3, name: 'Yoruba' }];

app.get('/', (req, res) => {
    res.render('index', { title: 'My Express App', message: 'Hello!' })
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    var course = courses.find(c => { return c.id === parseInt(req.params.id) });
    if (course) return res.send(course);
    res.status(404).send('Course does not exist');
});

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    var course = courses.find(c => { return c.id === parseInt(req.params.id) });
    if (!course) return res.status(404).send('The course with the given ID was not found')

    const schema = {
        name: Joi.string().min(3).required()
    };

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    var course = courses.find(c => { return c.id === parseInt(req.params.id) });
    if (!course) return res.status(404).send('The course with the given ID was not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));