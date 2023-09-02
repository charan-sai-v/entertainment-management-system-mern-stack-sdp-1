const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    phone: String,
    address: String,
    created_at : { type: Date, default: Date.now },
    updated_at : { type: Date, default: Date.now }
})

module.exports = mongoose.model('Employee', employeeSchema)