const path = require('path');

console.log(path.sep);

const filePath = path.join('/content', 'subfolder', 'test.js');
console.log(filePath);

const base = path.basename(filePath);
// logs the file in the filepath
console.log('base', base);

const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.js');
// __dirname is the path where app.js is located
console.log("absolute>>", absolute);