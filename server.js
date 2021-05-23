const express = require('express');
const app = express();

app.listen(process.env.PORT || 5000, () => console.log("Server running..."));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

// app.get('/', (req, res) => res.send("Hello Project"));

let users = [
    {username: "A", password: "123"},
    {username: "B", password: "567"}
];

let messages = [
    {username: "A", text: "Hello"},
    {username: "B", text: "How are you"}
]

app.get('/users', (req, res) => res.send(users));
app.get('/messages', (req, res) => res.send(messages));

app.post('/messages', (req, res) => {
    console.log(req.body)
    let message = {
        username: req.body.username,
        text: req.body.text
    }
    messages.push(message);
    res.send(messages);
});

