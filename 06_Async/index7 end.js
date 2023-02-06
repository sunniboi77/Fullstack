// video 5
//Named functions

console.log('Before');
getUser(2, displayUser);

console.log("After");

function displayCommits(commits) {
    console.log(commits);
}

function displayRepositories(repos) {
    getCommits(repos, displayCommits);
}

function displayUser(user) {
    getRepositories(user.gitHubuser, displayRepositories);
}


// Original async function 
// function getUser(id, callback) {
//     setTimeout(() => {
//         console.log('reading a user from db...');
//         // this user object is not av ailable at runtime
//         callback({ id: id, gitHubUser: 'mosh' })
//     }, 1000);
// }


//async function with PROMISE 
function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('reading a user from db...');
            // this user object is not av ailable at runtime
            resolve({ id: id, gitHubUser: 'mosh' })
        }, 1000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('reading a repo from repos database ');
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

