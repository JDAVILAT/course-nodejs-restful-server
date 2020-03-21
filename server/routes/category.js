const express = require('express');
const _ = require('underscore');
const Category = require('../models/category');
const { verifyToken } = require('../middlewares/authentication');
const { validateRoleAdmin } = require('../middlewares/validations');

const app = express();

app.get('/api/category/:id', verifyToken, (req, res) => {
    let id = req.params.id;
    let conditions = { Status: true };
    Category.findById(id, 'description Status', conditions, (err, category) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            category
        });
    });
});

app.get('/api/category', verifyToken, (req, res) => {
    let conditions = { Status: true };
    Category.find(conditions, 'description Status').exec((err, Categories) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        Category.count(conditions, (err2, countCategories) => {
            if (err2) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Error with'
                    }
                });
            }
            res.json({
                ok: true,
                totalRows: countCategories,
                Categories
            });
        });
    });
});

app.post('/api/category', [verifyToken, validateRoleAdmin], (req, res) => {
    let user = req.user;
    let body = req.body;

    let category = new Category({
        description: body.description,
        UserCreated: user._id,
        DateCreated: Date.now()
    });
    category.save((err, resultCategory) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            resultCategory
        });
    });
});

app.put('/api/category/:id', [verifyToken, validateRoleAdmin], (req, res) => {
    let id = req.params.id;
    let user = req.user;
    let body = _.pick(req.body, ['description']);
    body.UserModify = user._id;
    body.DateModify = Date.now()

    Category.findByIdAndUpdate(id, body, { new: true }, (err, resultCategory) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            resultCategory
        });
    });
});

app.delete('/api/category/:id', [verifyToken, validateRoleAdmin], (req, res) => {
    let id = req.params.id;
    let user = req.user;

    Category.findOneAndUpdate(id, { Status: false, UserModify: user._id, DateModify: Date.now() }, { new: true }, (err, resultCategory) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            resultCategory
        });
    });
});

module.exports = app;