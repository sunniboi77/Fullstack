// 08 debugging
// set in package.json start to: 
// "start": "set DEBUG=app:startup & node 05_Restful_Middleware/index.js",
// run npm start 

//set environment 
$env:NODE_ENV="development"   

// debug official namespace definition
 $env:DEBUG = "app:db,-not_this" 

//to use 2 namespaces
set DEBUG=app:startup,app:db


//to see all debugging messages use wildcard
set DEBUG=app:*

//set debug in terminal
//we will only see debugging messages
//which are part of the namespace defined
// set DEBUG=app:startup; 
