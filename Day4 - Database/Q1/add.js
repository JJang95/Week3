const yargs = require('yargs');
const fs = require('fs');
const fileName = 'todo.json';

const argv = yargs.options({
    title: {
        describe: 'Title of the to-do item',
        demandOption: true,
        type: 'string'
    },
    desc: {
        describe: 'Description of the to-do item',
        type: 'string'
    },
    status: {
        describe: 'Status of the to-do item',
        type: 'string',
        default: 'NOT FINISH'
    },
    time: {
        describe: 'Timestamp of the to-do item',
        type: 'string',
        default: Date.now()
    }
}).argv;

try {
    const fileData = fs.readFileSync(fileName, 'utf-8');
    const todos = JSON.parse(fileData);
    const existingTodo = todos.find(todo => todo.title === argv.title);
    if (existingTodo) {
        console.error('To-do item with this title already exists');
    } else {
        todos.push({
            title: argv.title,
            desc: argv.desc,
            status: argv.status,
            time: argv.time
        });
        fs.writeFileSync(fileName, JSON.stringify(todos));
        console.log(`To-do item "${argv.title}" added`);
    }
} catch (error) {
    const todos = [];
    todos.push({
        title: argv.title,
        desc: argv.desc,
        status: argv.status,
        time: argv.time
    });
    fs.writeFileSync(fileName, JSON.stringify(todos));
    console.log(`To-do item "${argv.title}" added`);
}