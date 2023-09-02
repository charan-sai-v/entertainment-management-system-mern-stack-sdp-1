
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    no_of_tickets: Number,
    event_id: String,
    event_name: String,
    user_id: String,
    user_name: String,
    created_at : { type: Date, default: Date.now },
    updated_at : { type: Date, default: Date.now },
    payment_id: String,
    payment_status: String,
    payment_amount: Number
})

module.exports = mongoose.model('Booking', bookingSchema)