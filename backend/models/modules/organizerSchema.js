const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    phone: String,
    password: String,
    role: {type: String, default: 'organizer'},
    created_at : { type: Date, default: Date.now },
    updated_at : { type: Date, default: Date.now }
})

module.exports = mongoose.model('Organizer', organizerSchema)