const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { required: true, type: String },
    email: { type: String, unique: true, required: true },
    password: { required: true, type: String },
    phone: { required: true, type: String, unique: true },
    address: { required: true, type: String },
    role : { type: String, default: 'employee' },
    is_password_changed: { type: Boolean, default: false },
    created_at : { type: Date, default: Date.now },
    updated_at : { type: Date, default: Date.now }
})

module.exports = mongoose.model('Employee', employeeSchema)