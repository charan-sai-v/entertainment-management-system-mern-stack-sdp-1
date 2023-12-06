
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    event_name: { type: String, required: true },
    no_of_tickets: { type: Number, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    user_name: { type: String, required: true },
    payment_id: String,
    payment_status: { type: String, required: true },
    payment_amount: { type: Number, required: true },
    created_at : { type: Date, default: Date.now },
    updated_at : { type: Date, default: Date.now },
})

module.exports = mongoose.model('Booking', bookingSchema)