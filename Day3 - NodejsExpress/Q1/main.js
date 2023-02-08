const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

let todos = [];

fs.readFile('todo.json', (err, data) => {
    if (err) throw new Error('file not exists');
    todos = JSON.parse(data);
});

app.get('/todo', (req, res) => {
    res.json(todos);
});

app.post('/todo', (req, res) => {
    const { title, desc } = req.body;
    const id = todos.length + 1;
    const timestamp = new Date();
    const status = "NOT FINISHED";
    todos.push({ id, title, desc, timestamp, status });

    fs.writeFile('todo.json', JSON.stringify(todos), (err) => {
        if (err) throw new Error('Error saving todo item');
    });

    res.json({ id, title, desc, timestamp, status });
});

app.put('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === id);
    if (!todo) return res.status(404).json({ error: "Todo item not found" });

    todo.status = todo.status === "NOT FINISHED" ? "FINISHED" : "NOT FINISHED";
    fs.writeFile('todo.json', JSON.stringify(todos), (err) => {
        if (err) throw new Error('Error updating todo item');
    });

    res.json(todo);
});
