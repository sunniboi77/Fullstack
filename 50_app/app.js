var http = require('http');
var fs = require('fs');
var path = require('path');
const { createReadStream } = require('fs');


const filePath = path.resolve(__dirname, 'content/big.txt');

http.
    createServer(function (req, res) {
        const fileStream = createReadStream(filePath, { highWaterMark: 500, encoding: 'utf8' });
        fileStream.on('open', () => {
            fileStream.pipe(res)
        })
        fileStream.on('error', (err) => {
            res.end(err)
        })

    })
    .listen(3000)