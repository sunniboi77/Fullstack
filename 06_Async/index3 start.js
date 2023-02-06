// video 5 
// change starts here 
console.log('Before');
getUser(2, (user) => {
    getRepositories(user.gitHubuser, (repos) => {
        getCommits(repos, (commits) => {
        });
    });
});

console.log("After");

function getUser(id, callback) {
    setTimeout(() => {
        console.log('reading a user from db...');
        // this user object is not av ailable at runtime
        callback({ id: id, gitHubUser: 'mosh' })
    }, 1000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('reading a repo from repos database ');
        callback({ repo: ['repo1', 'repo2', 'repo3'] })
    }, 300)
}

function getCommits(x, callback) {
    setTimeout(() => {
        console.log('Calling github database..');
        callback({ commit: ['commit1', 'commit2', 'commit3'] })
    }, 400)
}

//callbacks
//promises
//async/await

