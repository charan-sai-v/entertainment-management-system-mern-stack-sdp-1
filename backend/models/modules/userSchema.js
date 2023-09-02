const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    phone: String,
    address: String,
    gender: String,
    image: Buffer,
    created_at : { type: Date, default: Date.now },
    updated_at : { type: Date, default: Date.now },
    
})

module.exports = mongoose.model('User', userSchema)