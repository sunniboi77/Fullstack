const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('hello212asdfaf     !')
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
})

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
