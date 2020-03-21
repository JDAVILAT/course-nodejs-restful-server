const express = require('express');
const _ = require('underscore');
const { verifyToken } = require('../middlewares/authentication');
const { validateRoleAdmin } = require('../middlewares/validations');
const Product = require('../models/product');
const app = express();

app.get('/api/product/:id', verifyToken, (req, res) => {
    let id = req.params.id;
    Product.findById(id)
        .populate('category', 'description')
        .populate('usercreated', 'name mail')
        .populate('usermodify', 'name mail')
        .exec((err, resultProduct) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    err
                });
            }
            if (!resultProduct) {
                return res.status(400).json({
                    success: false,
                    err: {
                        message: 'Product no exists.'
                    }
                });
            }
            res.json({
                success: true,
                resultProduct
            });
        })
});

app.get('/api/product/:limit?/:skip?', verifyToken, (req, res) => {
    let _skip = req.params.skip || req.query.skip || 0;
    _skip = Number(_skip);
    _skip = !Number.isInteger(_skip) ? 0 : _skip;
    let _limit = req.params.limit || req.query.limit || 5;
    _limit = Number(_limit);
    _limit = !Number.isInteger(_limit) ? 5 : _limit;
    let conditions = { status: true };
    Product.find(conditions)
        .skip(_skip)
        .limit(_skip)
        .sort('name')
        .populate('usercreated', 'name mail')
        .populate('usermodify', 'name mail')
        .populate('category', 'description')
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    err
                });
            }

            Product.countDocuments(conditions, (err2, countProducts) => {
                res.json({
                    success: true,
                    totalRows: countProducts,
                    products
                });
            });
        });
});

app.get('/api/product/search/:name?/:description?', verifyToken, (req, res) => {
    let reName = new RegExp(req.params.name, 'i');
    let reDescription = new RegExp(req.params.description, 'i');
    Product.find({ name: reName, description: reDescription })
        .populate('category', 'description')
        .populate('usercreated', 'name mail')
        .populate('usermodify', 'name mail')
        .exec((err, resultProducts) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    err
                });
            }
            res.json({
                success: true,
                resultProducts
            });
        });
});

app.post('/api/product', [verifyToken, validateRoleAdmin], (req, res) => {
    let user = req.user;
    let body = _.pick(req.body, ['name', 'unitprice', 'description', 'category']);

    let product = new Product(body);
    product.usercreated = user._id;

    product.save({ new: true, runValidators: true }, (err, resultProduct) => {
        if (err) {
            return res.status(400).json({
                success: false,
                err
            });
        }
        res.json({
            success: true,
            resultProduct
        });
    });
});

app.put('/api/product/:id', [verifyToken, validateRoleAdmin], (req, res) => {
    let user = req.user;
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'unitprice', 'description', 'category']);
    body.usermodify = user._id;
    body.datemodify = Date.now();

    Product.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, product) => {
        if (err) {
            return res.status(400).json({
                success: false,
                err
            });
        }
        res.json({
            success: true,
            product
        });
    });
});

app.delete('/api/product/:id', [verifyToken, validateRoleAdmin], (req, res) => {
    let id = req.params.id;
    let user = req.user;

    Product.findOneAndUpdate(id, { status: false, usermodify: user._id, datemodify: Date.now() }, { new: true }, (err, product) => {
        if (err) {
            return res.status(400).json({
                success: false,
                err
            });
        }
        res.json({
            success: true,
            product
        });
    });
});

module.exports = app;