const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user');
const app = express();

app.get('/', (req, res) => {
    res.json('Inicio de la aplicacion');
});

app.get('/users', function(req, res) {
    res.json('get users');
});

app.get('/ereslamujerdemivida', function(req, res) {
    res.sendFile(__dirname + '/lesly.html');
});

app.post('/user', (req, res) => {
    let body = req.body;

    let _user = new User({
        name: body.name,
        mail: body.mail,
        password: bcrypt.hashSync(body.password, 10),
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

app.put('/user/:id', function(req, res) {
    let id = req.params.id;
    let body = req.body;

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, responseUser) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            user: responseUser
        });
    });
});

app.delete('/user', (req, res) => {
    res.json('delete user');
});

module.exports = app;