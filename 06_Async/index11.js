console.log('Before');

// Promise based approach
// getUser(1)
//     .then(user => getRepositories(user.gitHubUser))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log('Commits', commits))
//     .catch(err => console.log('Error', err.message))

//Async and Await approach
async function displayCommits() {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUser);
    const commits = await getCommits(repos[0]);
    console.log('Commits:', commits);
}
displayCommits();


console.log('After');


function displayRepositories(repos) {
    getCommits(repos, displayCommits);
}

function displayUser(user) {
    getRepositories(user.gitHubuser, displayRepositories);
}


//async function with PROMISE 
function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('reading a user from db...');
            // this user object is not av ailable at runtime
            resolve(['repo1', 'repo2', 'repo3']);
            // reject(new Error('Could not get the repos!'));
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


