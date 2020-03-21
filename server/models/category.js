const mongoose = require('mongoose');

let categorySchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'The description is required.']
    },
    Status: {
        type: Boolean,
        required: [true, 'Status is required.'],
        default: true
    },
    UserCreated: {
        type: mongoose.ObjectId,
        required: [true, 'Creation user is required']
    },
    DateCreated: {
        type: Date,
        required: [true, 'Creation date is required'],
        default: Date.now
    },
    UserModify: {
        type: mongoose.ObjectId,
        default: null
    },
    DateModify: {
        type: Date,
        default: null
    }
});

// categorySchema.methods.toJSON = function() {
//     let category = this;
//     let 
//     return category;
// }

module.exports = mongoose.model('Category', categorySchema);