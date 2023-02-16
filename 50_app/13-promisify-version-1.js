
const { readFile, writeFile } = require('fs');
const path = require('path');
const util = require('util');


const readFilePromise = util.promisify(readFile);
const writeFilePromise = util.promisify(readFile);


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

const filePath = path.resolve(__dirname, 'content/first.txt');
const filePath2 = path.resolve(__dirname, 'content/second.txt');


const start = async () => {
    try {
        const first = await getText(filePath);
        const second = await getText(filePath2);
        console.log(first);
        console.log(second);
    } catch {
        console.log(error);
    }
}

start()

// getText(filePath)
//     .then(result => console.log(result))
//     .catch((err) => console.log(err))
