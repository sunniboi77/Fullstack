const { readFileSync, writeFileSync, write } = require('fs');
console.log('start')
const path = require("path");
const first = readFileSync(path.resolve(__dirname, "content/first.txt"), 'utf8');
const second = readFileSync(path.resolve(__dirname, "content/second.txt"), 'utf8');

writeFileSync(path.resolve(__dirname, "content/result-sync.txt"),
    `here is the result ${first} and ${second}`,
    //flag approves adding to file instead 
    { flag: 'a' }
);


console.log('done with this task');
console.log('starting the next one'); 