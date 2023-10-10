const mongoose = require('mongoose');


const Event = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        maxlength: 1000,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    created_at : { type: Date },
    updated_at : { type: Date },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        validate: {
            validator: function (value) {
                return this.start_date < value;
            },
            message: 'End date must be greater than start date'
        },
    },

    location: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    no_of_participants: {
        type: Number,
        default: 0
    },
    start_registration: {
        type: Date,
        required: true
    },
    end_registration: {
        type: Date,
        validate: {
            validator: function (value) {
                return this.start_registration < value;
            },
            message: 'End registration must be greater than start registration'
        },
    },
    category: {
        type: String,
        // enum: ['Music', 'Sport', 'Food', 'Art', 'Fashion', 'Technology', 'Education', 'Other'],
        required: true
    },
    cancel_deadline: {
        type: Date,
        validate: {
            validator: function (value) {
                return this.start_registration < value;
            },
            message: 'Cancel deadline must be greater than start registration'
        },
    },
    organizerId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
    },
    organizerCompany: {
        type: String,
    },
    organizerName: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_approved: {
        type: Boolean,
        default: false
    },
    is_rejected: {
        type: Boolean,
        default: false
    },
    is_cancelled: {
        type: Boolean,
        default: false
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    is_full: {
        type: Boolean,
        default: false
    }
})




module.exports = mongoose.model('Event', Event)
    



