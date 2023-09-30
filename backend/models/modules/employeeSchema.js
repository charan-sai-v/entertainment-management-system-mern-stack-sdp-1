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
    role : { type: String, default: 'employee' },
    is_password_changed: { type: Boolean, default: false },
    created_at : { type: Date, default: Date.now },
    updated_at : { type: Date, default: Date.now }
})

module.exports = mongoose.model('Employee', employeeSchema)