const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fname: String,
    lname: String,
    email: String,
    password: String,
    role: { type: String, enum: ['admin', 'user'] }
})

module.exports = mongoose.model('user', userSchema);