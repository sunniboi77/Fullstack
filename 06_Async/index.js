console.log('before');
const user = getUser(1);
console.log(user);
console.log("after");

function getUser(id) {
    setTimeout(() => {
        console.log('reading a user from db...');
        return { id: id, gitHubUser: 'mosh' }
    }, 1000);
    return 1;
}

//callbacks
//promises
//async/await