const os = require('os');

//info current user
const user = os.userInfo();
console.log(user);

console.log(`uptime ${os.uptime() / 60 / 60}`);

const currentOS = {
    name: os.type,
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem(),
}

console.log(currentOS);