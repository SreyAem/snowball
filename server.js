const express = require('express');
const app = express();

app.listen(process.env.PORT || 5000, () => console.log("Server running..."));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

let users = [
    {username: "A", password: ""},
    {username: "B", password: "567"}
];

let messages = [];

app.get('/users', (req, res) => res.send(users));
app.get('/messages', (req, res) => res.send(messages));

app.post('/users', (req, res) => {
    let user = {
        username: req.body.username,
        password: req.body.password,
        pic: req.body.pic
    };
    users.push(user);
    res.send(users);
});

app.post('/messages', (req, res) => {
    let message = {
        username: req.body.username,
        text: req.body.text,
        bold: req.body.bold,
        italic: req.body.italic,
        underline: req.body.underline,
        time: req.body.time
    };
    messages.push(message);
    res.send(messages);
});