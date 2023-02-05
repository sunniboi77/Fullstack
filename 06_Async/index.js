console.log('before');
getUser(1, function (user) {
    console.log('User', user);
});
console.log("after");

function getUser(id, callback) {
    setTimeout(() => {
        console.log('reading a user from db...');
        // this user object is not available at runtime
        callback({ id: id, gitHubUser: 'mosh' })
    }, 1000);
}

function getRepositories(username) {
    return ['repo1', 'repo2', 'repo3']
}

//callbacks
//promises
//async/await

