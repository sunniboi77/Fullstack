const EventEmitter = require('events');
 

var url = 'http://mylogger.io/log'

// Recap : if you want raise an event to signal when something happened on the application. 
// we want to create a class that extends EventEmitter
// so this class has all the functionality of the EventEmitter class
// instead of having different emitter objects 

class Logger extends EventEmitter {
    log(message) {
        // send an http request 
        console.log(message);

        //Raise an event with an object returned 
        this.emit('messageLogged', { id: 1, url: 'http://' });
    }
}

//we are exporting not a log a function but a class
module.exports = Logger;
