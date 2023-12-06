const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { required: true, type: String, unique: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    company : { default: null, type: String },
    is_bank_account: { default: false, type: Boolean },
    bank_account_name: { type: String },
    bank_account_number: { type: Number },
    bank_ifsc_code: { type: String },
    bank_name: { type: String },
    created_at : { type: Date, default: Date.now },
    updated_at : { type: Date, default: Date.now }
})

module.exports = mongoose.model('Organizer', organizerSchema)