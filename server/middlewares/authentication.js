const jwt = require('jsonwebtoken');

/**
 * VERIRICAR TOKEN
 */

let authentication = {};

authentication.verifyToken = (req, res, next) => {
    let authorization = req.get('authorization');

    jwt.verify(authorization, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.user = decoded.user;
        next();
    });
};

authentication.verifyTokenByUrl = (req, res, next) => {
    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.user = decoded.user;
        next();
    });
};

module.exports = authentication;