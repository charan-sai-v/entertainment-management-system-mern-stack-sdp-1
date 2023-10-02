const mongoose = require('mongoose');

const Event = new mongoose.Schema({
    name: String,
    description: String,
    image: Buffer,
    created_at : { type: Date, default: Date.now },
    updated_at : { type: Date, default: Date.now },
    start_date: Date,
    end_date: Date,
    location: String,
    capacity: Number,
    price: Number,
    category: String,
    organizerId: String,
    organizerName: String
})

module.exports = mongoose.model('Event', Event)
    



