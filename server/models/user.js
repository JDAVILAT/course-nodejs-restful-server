const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

let rolesValid = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido.'
}

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required.']
    },
    mail: {
        type: String,
        unique: true,
        required: [true, 'mail is required.']
    },
    password: {
        type: String,
        required: [true, 'password is required.']
    },
    image: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: rolesValid
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'user'
});

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

userSchema.plugin(mongooseUniqueValidator, { message: '{PATH} debe de ser unico.' });

module.exports = mongoose.model('User', userSchema);