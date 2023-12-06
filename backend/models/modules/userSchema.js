const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { required: true, type: String },
    email: { type: String, required: true, unique: true },
    password: { required: true, type: String },
    phone: { type: String, required: true, unique: true },
    gender: { required: true, type: String },
    is_verified: { type: Boolean, default: false },
    token: { type: String },
    token_expires: { type: Date },
    created_at : { type: Date, default: Date.now },
    updated_at : { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', userSchema)