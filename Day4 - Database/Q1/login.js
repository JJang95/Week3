const yargs = require('yargs');
const argv = yargs.options({
    username: {
        describe: 'Username',
        demandOption: true,
        type: 'string'
    },
    password: {
        describe: 'Password',
        demandOption: true,
        type: 'string'
    }
}).argv;

if (argv.username === 'admin' && argv.password === 'admin') {
    console.log('Login Successful');
} else {
    console.log('Wrong Username or Password');
}