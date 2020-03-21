var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: { type: String, required: [true, 'Name is requerid.'] },
    unitprice: { type: Number, required: [true, 'Unit price is requerid.'] },
    description: { type: String, required: false },
    status: { type: Boolean, required: [true, 'Status is requerid.'], default: true },
    category: { type: mongoose.ObjectId, ref: 'Category', required: [true, 'Category is requerid.'] },
    usercreated: { type: mongoose.ObjectId, ref: 'User', required: [true, 'User created is requerid.'] },
    datecreated: { type: Date, required: [true, 'Date created is required.'], default: Date.now },
    usermodify: { type: mongoose.ObjectId, ref: 'User', required: false, default: null },
    datemodify: { type: Date, required: false, default: null }
}, {
    collection: 'product'
});


module.exports = mongoose.model('Product', productSchema);