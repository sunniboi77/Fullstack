const { rmSync } = require("fs");
const http = require('http');
const { removeListener } = require("process");


//this server could be very complicated with a lot ifs with various urls
//we will use express in the future
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }

    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]))
    }
    res.end();
});

server.listen(8080);

console.log('Listening on port 8080...');