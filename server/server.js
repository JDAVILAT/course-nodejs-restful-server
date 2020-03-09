require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json('Inicio de la aplicacion');
});

app.get('/users', function(req, res) {
    res.json('get users');
});

app.put('/user/:id', function(req, res) {
    let id = req.params.id;
    res.json(`put user = ${id}`);
});

app.post('/user', (req, res) => {
    let body = req.body;

    if (body.name === undefined) {
        res.status(400).json({
            ok: false,
            message: 'the name is requerid.'
        });
    } else {
        res.json({
            person: body
        });
    }
});

app.delete('/user', (req, res) => {
    res.json('delete user');
});

mongoose.connect('mongodb://localhost:27017/cafe', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) throw err;
    console.log('BASE DE DATOS ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto: ${process.env.PORT}`);
});