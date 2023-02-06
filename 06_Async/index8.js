// video 5
//Named functions

const c = require("config");

console.log('Before');


// callback hell 
getUser(1, (user) => {
    getRepositories(user.gitHubUser, (repos) => {
        getCommits(repos[0], (commits) => {
            console.log(commits);
        })
    })
})

//promises flat structure
getUser(1)
    .then(user => getRepositories(user.gitHubUser))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('Commits', commits))
    .catch(err => console.log('error', err.message));

//async function with PROMISE 
function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('reading a user from db...');
            // this user object is not av ailable at runtime
            resolve({ id: id, gitHubUser: 'attila' })
        }, 1000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('reading a repo from repos database ');
            console.log(username);
            resolve({ repo: ['repo1', 'repo2', 'repo3'] })
        }, 300)
    })
}

function getCommits(repos) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling github database..');
            resolve({ commit: ['commit1', 'commit2', 'commit3'] })
        }, 400)
    })
}

//callbacks
//promises
//async/await

