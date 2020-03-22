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

validations.validateExtensions = (nameFile, extensionsAllow = []) => {
    let result = { message: '', extension: '' };
    if (extensionsAllow.length <= 0) {
        extensionsAllow = ['jpg', 'png', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];
    }
    let extensionFile = nameFile.split('.').pop();
    result.extension = extensionFile;
    if (extensionsAllow.indexOf(extensionFile) < 0) {
        result.message = 'Extension is not allowed';
    }
    return result;
};

module.exports = validations;