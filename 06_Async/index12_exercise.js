const c = require("config");

getCustomer(1, (customer) => {
    console.log('Customer: ', customer);
    if (customer.isGold) {
        getTopMovies((movies) => {
            console.log('Top movies: ', movies);
            sendEmail(customer.email, movies, () => {
                console.log('Email sent...')
            });
        });
    }
});


async function informCustomer() {
    const customer = await getCustomer(1);
    if (customer.isGold) {
        const topMovies = await getTopMovies(customer.name);
        console.log(topMovies);
        const sendmail = await sendEmail(customer.email, topMovies)
        console.log(sendmail, topMovies);
    }
}
informCustomer();


function getCustomer(id) {
    return new Promise((resolve, reject) => {
        console.log(id);

        setTimeout(() => {
            resolve({
                id: 1,
                name: 'Attila',
                isGold: true,
                email: 'Attila@email'
            });
        }, 500);
    })
}

function getTopMovies(name) {
    console.log(name);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
        }, 500);
    })
}

function sendEmail(email, movies) {
    console.log('email', email);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('email is sent to...');
        }, 500);
    })
}