// simulate a scenario where a promise 
// is already resolved or rejected
const p = Promise.resolve({ id: 1 })
const p2 = Promise.reject(new Error('reason for rejection...'))
const p3 = Promise.reject('reason for rejection...')

p.then(result => (console.log(result)))
//with callstack - with Error object detailed 
p2.catch(error => console.log(error));
//no error object on p3 - only error message is visible - no callstack
p3.catch(error => console.log(error));
