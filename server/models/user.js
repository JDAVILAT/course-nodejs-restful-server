const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    mail: {
        type: String,
        required: [true, 'El correo es necesario.']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria.']
    },
    image: {
        type: String,
        required: false
    },
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio.'],
        default: "USER_ROLE"
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);