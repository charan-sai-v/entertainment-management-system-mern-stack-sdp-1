const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user_id: String,
    booking_id: String,
    payment_type: String,
    payment_status: String,
    payment_amount: Number,
    created_at : { type: Date, default: Date.now },
    updated_at : { type: Date, default: Date.now }
})

module.exports = mongoose.model('Payment', paymentSchema)