const express = require('express');
const startpage = express.Router();

startpage.get('/', (req, res) => {
    // startupDebugger("getviewcalled");
    res.render('index', { title: "My Express App", message: "Hello world" });
})
module.exports = startpage;