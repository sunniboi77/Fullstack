//reading data in chunks 
const { createReadStream } = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'content/big.txt');

const stream = createReadStream(filePath, { highWaterMark: 500, encoding: 'utf8' })

stream.on('data', (result) => {
    console.log(result);
})

stream.on('error', (err) => console.log(err))