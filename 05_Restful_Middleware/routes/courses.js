const express = require('express');
const router = express.Router()

const courses = [
    { id: 1, name: 'course 1 ' },
    { id: 2, name: 'course 2 ' },
    { id: 3, name: 'course 3 ' },
];

router.get('/', (req, res) => {
    res.send(courses);
})

router.get('/:id', (req, res) => {
    res.send(req.params.id)
})

//multiple parameters results :
// {"year":"2022","month":"12"}
router.get('/:year/:month', (req, res) => {
    res.send(req.params)
})

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send("the course with the given id was not found")
    res.send(course);
})

router.post('/', (req, res) => {
    const { error } = validateCourse(req.body); //result.error
    if (error) {
        return res.status(400).send(error.details[0]);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    // res.send(course)
    res.send({ error, course });
});

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports=router;