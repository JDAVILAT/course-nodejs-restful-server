const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user');
const { verifyToken } = require('../middlewares/authentication');
const { validateRoleAdmin } = require('../middlewares/validations');
const app = express();

app.get('/', (req, res) => {
    res.json('Inicio de la aplicacion');
});

app.get('/api/user/:skip?/:limit?', [verifyToken], (req, res) => {
    let _skip = req.params.skip || req.query.skip || 0;
    _skip = Number(_skip);
    _skip = !Number.isInteger(_skip) ? 0 : _skip;
    let _limit = req.params.limit || req.query.limit || 5;
    _limit = Number(_limit);
    _limit = !Number.isInteger(_limit) ? 5 : _limit;
    let conditions = { status: true };
    User.find(conditions, 'name mail role status google')
        .skip(_skip)
        .limit(_limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            User.count(conditions, (err, countUsers) => {
                res.json({
                    ok: true,
                    totalRows: countUsers,
                    users
                });
            })
        });
});

app.post('/api/user', [verifyToken, validateRoleAdmin], (req, res) => {
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
    });
});

app.put('/api/user/:id', [verifyToken, validateRoleAdmin], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'mail', 'image', 'role', 'status']);

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

app.delete('/api/user/:id', [verifyToken, validateRoleAdmin], (req, res) => {
    let id = req.params.id;
    User.findByIdAndUpdate(id, { status: false }, { new: true }, (err, resultUser) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            user: resultUser
        });
    });
});

module.exports = app;