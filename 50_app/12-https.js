const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.end('welcome our homepage')
    }
    if (req.url === '/about') {
        res.end('here is our short history')
    }
    res.end(`
    <h1>OOOpss!</h1>
    <p>not found</p> 
    <a href="/">back home>
    `)

})

server.listen(3000)