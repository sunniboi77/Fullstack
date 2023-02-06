//both operations start at the same time
//result will be available as an array



const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operation 1...');
        resolve(1)
    }, 500)
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operation 2...');
        resolve(2)
    }, 1000)
});

// reject one promise to see what happens
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operation 3...');
        reject(new Error('this promise fails... '))
    }, 1500)
});

// Promise.all([p1, p2, p3])
//     .then(result => console.log(result))
//     .catch(err => console.log('Error', err.message));

//when we want to do as soon as the any operation complete 
//in this case the promise is fullfilled 
Promise.race([p1, p2, p3])
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message));