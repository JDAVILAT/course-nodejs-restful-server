const express = require('express');
const fileUpload = require('express-fileupload');
const { validateExtensions } = require('../middlewares/validations');
const { verifyToken } = require('../middlewares/authentication');
const fs = require('fs');
const path = require('path');

const app = express();
const User = require('../models/user');
const Product = require('../models/product');

// default options
app.use(fileUpload());

app.put('/api/upload/:type/:id', verifyToken, function(req, res) {
    let params = req.params;
    let typesAllow = ['products', 'users'];
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            success: false,
            err: { message: 'No files were uploaded.' }
        });
    }

    if (typesAllow.indexOf(params.type) < 0) {
        return res.status(400).json({
            success: false,
            err: {
                message: 'Type is not allowed.'
            }
        });
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let file = req.files.file;

    let extensionsAllow = ['jpg', 'png', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];

    let resultValidateExtens = validateExtensions(file.name, extensionsAllow);

    if (resultValidateExtens.message != '') {
        return res.json({
            success: false,
            err: {
                message: resultValidateExtens.message
            }
        });
    }
    let nameFileFull = `${params.id}-${Date.now()}.${resultValidateExtens.extension}`;
    // Use the mv() method to place the file somewhere on your server
    file.mv(`uploads/${params.type}/${nameFileFull}`, (err) => {
        if (err) {
            return res.status(500).json({ success: false, err });
        }

        if (params.type == 'users') {
            UpdateImageUser(params.id, res, nameFileFull);
        } else if (params.type == 'products') {
            UpdateImageProduct(params.id, res, nameFileFull);
        }

        // res.json({
        //     success: true,
        //     err: { message: 'File uploaded!' }
        // });
    });
});

function UpdateImageUser(id, res, fullname) {
    User.findById(id, (err, foundUser) => {
        if (err) {
            DeleteFile('users', fullname);
            return res.status(500).json({
                success: false,
                err
            });
        } else if (!foundUser) {
            DeleteFile('users', fullname);
            return res.status(400).json({
                success: false,
                err: {
                    message: 'User is not exists.'
                }
            });
        }
        DeleteFile('users', foundUser.image);
        foundUser.image = fullname;
        foundUser.save((errSave, resultUser) => {
            if (errSave) {
                return res.status(500).json({
                    success: false,
                    err: errSave
                });
            }
            res.json({
                success: true,
                resultUser
            });
        });
    });
}

function UpdateImageProduct(id, res, fullname) {
    Product.findById(id).exec((err, foundProduct) => {
        if (err) {
            DeleteFile('products', fullname);
            return res.status(500).json({
                success: false,
                err
            });
        } else if (!foundProduct) {
            DeleteFile('products', fullname);
            return res.status(400).json({
                success: false,
                err: {
                    message: 'Product is not exists.'
                }
            });
        }
        DeleteFile('products', foundProduct.image);
        foundProduct.image = fullname;
        foundProduct.save({ new: true }, (errSave, resultProduct) => {
            if (errSave) {
                return res.status(500).json({
                    success: false,
                    err: errSave
                });
            }
            res.json({
                success: true,
                resultProduct
            });
        });
    });
}

function DeleteFile(type, filename) {
    let fullpathname = path.resolve(__dirname, `../../uploads/${type}/${filename}`);
    if (fs.existsSync(fullpathname)) {
        fs.unlinkSync(fullpathname);
    }
}

module.exports = app;