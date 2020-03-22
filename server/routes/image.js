const express = require('express');
const fs = require('fs');
const path = require('path');
const { verifyTokenByUrl } = require('../middlewares/authentication');

const app = express();

app.get('/api/image/:type/:image', verifyTokenByUrl, (req, res) => {
    let params = req.params;
    let pathImage = path.resolve(__dirname, `../../uploads/${params.type}/${params.image}`);
    if (fs.existsSync(pathImage)) {
        res.sendFile(pathImage);
    } else {
        let pathAbsoluteImgNotFound = path.resolve(__dirname, '../assets/Not_found.png')
        res.sendFile(pathAbsoluteImgNotFound);
    }
});

module.exports = app;