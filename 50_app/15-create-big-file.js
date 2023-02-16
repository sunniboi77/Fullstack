const path = require('path');
const { writeFileSync } = require('fs');

const cwd = process.cwd();

console.log(`Current working directory: ${cwd}`);
const filePath = path.resolve(__dirname, 'content/big.txt');

for (let i = 0; i < 100000; i++) {
    writeFileSync(filePath, `hello world ${i}\n`, { flag: 'a' })
}