const EventEmitter = require('events');

//require logger modul and we get a Class Logger
const Logger = require('./logger');
//Create Object - we use an instance of a class 
const logger = new Logger();

//Register a listener on Logger Object - after creating a logger
//not on 
// emitter.on('messageLogged)... 
// - but on logger
logger.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
});

logger.log('message');

