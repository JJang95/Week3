const yargs = require('yargs');
const fs = require('fs');
const fileName = 'todo.json';

const argv = yargs.options({
    title: {
        describe: 'Title of the to-do item to be finished',
        demandOption: true,
        type: 'string'
    }
}).argv;

try {
    const fileData = fs.readFileSync(fileName, 'utf-8');
    const todos = JSON.parse(fileData);
    const index = todos.findIndex(todo => todo.title === argv.title);
    if (index === -1) {
        console.error(`To-do item with title "${argv.title}" not found`);
    } else {
        todos[index].status = 'FINISH';
        fs.writeFileSync(fileName, JSON.stringify(todos));
        console.log(`To-do item "${argv.title}" finished`);
    }
} catch (error) {
    console.error('File not found');
}