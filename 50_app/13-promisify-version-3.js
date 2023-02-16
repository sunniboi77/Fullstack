
const { readFile, writeFile } = require('fs').promises;
const path = require('path');
// const util = require('util');

// const readFilePromise = util.promisify(readFile);
// const writeFilePromise = util.promisify(writeFile);

const filePath = path.resolve(__dirname, 'content/first.txt');
const filePath2 = path.resolve(__dirname, 'content/second.txt');
const filePath3 = path.resolve(__dirname, 'content/result-mind-grenade.txt');

const cwd = process.cwd();
console.log(`Current working directory: ${cwd}`);

const start = async () => {
    try {
        const first = await readFile(filePath, 'utf8');
        const second = await readFile(filePath2, 'utf8');
        await writeFile(
            filePath3,
            `this is awesome: ${first} ${second}`, { flag: 'a' })
        console.log(first);
        console.log(second);
    } catch (error) {
        console.log(error);
    }
}

start()

// instead of getText we will use "util" and promisify
// const getText = (filePath) => {
//     return new Promise((resolve, reject) => {
//         readFile(filePath, 'utf8', (err, data) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(data);
//             }
//         });
//     })
// }

// getText(filePath)
//     .then(result => console.log(result))
//     .catch((err) => console.log(err))

