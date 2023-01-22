const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('hello212asdfaf     !')
const courses = [
    { id: 1, name: 'course 1 ' },
    { id: 2, name: 'course 2 ' },
    { id: 3, name: 'course 3 ' },
];

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
})

app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id)
})

//multiple parameters results :
// {"year":"2022","month":"12"}
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params)
})

//multiple parameters results with "?" mark 
// query string parameter:?sortBy=name
// this is optional 
// http://localhost:3000/api/posts/2022/12?sortBy=mame
// result is : 
// {"sortBy":"name"}
app.get('/api/posts2/:year/:month', (req, res) => {
    res.send(req.query)
// app.get('/api/courses', (req, res) => {
//     res.send([1, 2, 3]);
// })

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send("the course with the given id was not found")
    res.send(course);
})

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
