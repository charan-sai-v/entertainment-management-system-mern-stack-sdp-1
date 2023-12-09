const mongoose = require('mongoose');
const eventSchema = require('./eventSchema');

const bookingSchema = new mongoose.Schema({
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true},
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    event: { type: mongoose.Schema.Types.Mixed, required: true }, // event details
    user: { type: mongoose.Schema.Types.Mixed, required: true }, // user details
    no_of_tickets: { type: Number, required: true },
    payment_id: String,
    payment_status: { type: String, required: true },
    payment_amount: { type: Number, required: true },
    created_at : { type: Date, default: Date.now },
    updated_at : { type: Date, default: Date.now },
})

module.exports = mongoose.model('Booking', bookingSchema);
