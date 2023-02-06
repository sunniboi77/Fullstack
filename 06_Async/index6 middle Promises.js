
console.log('before');
const p = new Promise((resolve, reject) => {
    // resolve and reject are functions

    setTimeout(() => {
        // resolve({ ud: 1 });
        reject(new Error('message fault'));;
    });
}, 500);


p.then(result => console.log('Result', result))
    .catch(err => console.log('ERROR', err.message))

console.log('after');

console.log(p); 