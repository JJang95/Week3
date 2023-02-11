const fs = require('fs');
const fileName = 'todo.json';

try {
    const fileData = fs.readFileSync(fileName, 'utf-8');
    const todos = JSON.parse(fileData);
    console.log(todos);
} catch (error) {
    console.error('File not found');
}