const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    phone: {
        type: Number,
        required: true  
    },
    password: {
        type: String,
        required: true
    },
    company : {
        default: null,
        type: String
    },
    role: {type: String, default: 'organizer'},
    created_at : { type: Date, default: Date.now },
    updated_at : { type: Date, default: Date.now }
})

module.exports = mongoose.model('Organizer', organizerSchema)