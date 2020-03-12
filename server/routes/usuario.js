const express = require('express');
const User = require('../models/user');
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

    let _user = new User({
        name: body.name,
        mail: body.mail,
        password: body.password,
        role: body.role
    });

    _user.save((err, userDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                user: userDB
            });
        }
    })
});

app.delete('/user', (req, res) => {
    res.json('delete user');
});

module.exports = app;