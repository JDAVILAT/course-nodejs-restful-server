const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const app = express();

app.post('/api/login', (req, res) => {
    let body = req.body;
    User.findOne({ mail: body.mail.trim() }, (err, resUser) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        } else if (!resUser) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos.'
                }
            });
        } else if (!bcrypt.compareSync(body.password, resUser.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos.'
                }
            });
        } else {
            let token = jwt.sign({
                user: resUser
            }, process.env.SEED, { expiresIn: process.env.EXPIRATION_TOKEN });
            res.json({
                ok: true,
                user: resUser,
                token
            });
        }
    });
});

module.exports = app;