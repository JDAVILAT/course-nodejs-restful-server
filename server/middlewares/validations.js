let validations = {};

validations.validateRoleAdmin = (req, res, next) => {
    let user = req.user;
    if (user.role != 'ADMIN_ROLE') {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'The user is not an administrator.'
            }
        });
    }
    next();
};

module.exports = validations;