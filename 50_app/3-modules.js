
const names = require('./4-names');
const { john: a, b } = require('./4-names')
const sayHi = require('./5-utils');

//the function in this module will run even if the dont assign it
//when you import a module it is invoked
//we can just require and it will invoke it 
//js wraps a module always 
require('./7-mind-grenade') //the sum is 15

const data = require('./6-alternate-flavor')
console.log(data, data.items[0]);
// console.log(names);

// sayHi(names.john)
// sayHi(a)

