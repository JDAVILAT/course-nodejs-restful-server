const express = require('express');
const user = require('../models/user');
const app = express();

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

module.exports = app;