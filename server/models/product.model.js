const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    pname: { type: String },
    quantity: { type: Number },
    price: { type: Number }
})

module.exports = mongoose.model('product', productSchema);