// video 4 callback hell 
console.log('before');
getUser(2, (user) => {
    console.log('User', user);
    getRepositories(user.gitHubuser, (repo) => {
        console.log('user.gitHubUser', user.gitHubUser);
        getCommits(repo, (commits) => {
            console.log(repo, commits);
        });
    });
});


console.log("after");

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
        callback({ commit: ['commit1', 'commit2', 'commit3'] })
    }, 400)
}

//callbacks
//promises
//async/await

