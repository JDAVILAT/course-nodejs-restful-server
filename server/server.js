require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

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

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto: ${process.env.PORT}`);
});