const mongoose = require('mongoose');


const Event = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, maxlength: 1000, required: true },
    image: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    price: { type: Number, required: true },
    no_of_participants: { type: Number, default: 0 },
    start_date: { type: Date, required: true },
    end_date: { type: Date, 
        validate: {
            validator: function (value) {
                return this.start_date < value;
            },
            message: 'End date must be greater than start date'
        },
    },
    start_registration: { type: Date, required: true },
    end_registration: { type: Date,
        validate: {
            validator: function (value) {
                return this.start_registration < value;
            },
            message: 'End registration must be greater than start registration'
        },
    },
    category: { type: String, required: true },
    is_cancelable: { type: Boolean, required: true, default: false },
    cancel_deadline: { 
        type: Date,
        validate: {
            validator: function (value) {
                return this.start_registration < value;
            },
            message: 'Cancel deadline must be greater than start registration'
        },
        default: null,
    },
    organizerId: { required: true, type: mongoose.Schema.Types.ObjectId, },
    organizerCompany: { type: String, },
    organizerName: { type: String, required: true },
    status: { type: String, default: 'pending' }, // pending, approved, rejected, deleted
})




module.exports = mongoose.model('Event', Event)
    



