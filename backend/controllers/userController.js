
const User = require('../models/modules/userSchema')
const Event = require('../models/eventSchema')
const Booking = require('../models/bookingSchema')
const Payment = require('../models/paymentSchema')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// user register
async function userRegister(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPassword,
            address: req.body.address
        });
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });      
    }
}


// user login
async function userLogin(req, res) {
    try {
        // check if user email exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(400).json({ message: 'User does not exist' });
        }
        // check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Password is incorrect' });
        }
        // create and assign a token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// view all events
async function viewAllEvents(req, res) {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// view event by id
async function viewEventById(req, res) {
    try {
        const event = await Event.findById(req.params.id);
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// book an event
async function bookEvent(req, res) {
    try {
        // check if event capacity is full
        const event = await Event.findById(req.params.id);
        if (event.capacity <= 0) {
            res.status(400).json({ message: 'Event capacity is full' });
        }
        // check if user has already booked the event
        const booking = await Booking.findOne({ userId: req.user._id, eventId: req.params.id });
        if (booking) {
            res.status(400).json({ message: 'You have already booked this event' });
        }

        // create a booking
        const newBooking = new Booking({
            userId: req.user._id,
            eventId: req.params.id,
            eventName: event.name,
            eventLocation: event.location,
            eventStartDate: event.start_date,
            eventEndDate: event.end_date,
            eventImage: event.image,
            eventOrganizerId: event.organizerId,
            eventOrganizerName: event.organizerName
        });
        await newBooking.save();
        // update event capacity
        event.capacity = event.capacity - 1;
        await event.save();
        res.status(200).json(newBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// view all bookings
async function viewAllBookings(req, res) {
    try {
        const bookings = await Booking.find({ userId: req.user._id });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// view booking by id
async function viewBookingById(req, res) {
    try {
        const booking = await Booking.findById(req.params.id);
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// cancel booking
async function cancelBooking(req, res) {
    try {
        // check if booking exists
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            res.status(400).json({ message: 'Booking does not exist' });
        }
        // check if event start date is 5 hours away
        const event = await Event.findById(booking.eventId);
        const eventStartDate = new Date(event.start_date);
        const currentDate = new Date();
        const timeDifference = eventStartDate.getTime() - currentDate.getTime();
        const hoursDifference = timeDifference / (1000 * 3600);
        if (hoursDifference <= 5) {
            res.status(400).json({ message: 'You cannot cancel this booking' });
        }
        // update event capacity
        event.capacity = event.capacity + 1;
        await event.save();
        // delete booking
        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Booking cancelled' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// make payment
async function makePayment(req, res) {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            res.status(400).json({ message: 'Booking does not exist' });
        }
        // check if payment has already been made
        const payment = await Payment.findOne({ bookingId: req.params.id });
        if (payment) {
            res.status(400).json({ message: 'Payment has already been made' });
        }
        // create a payment
        const newPayment = new Payment({
            userId: req.user._id,
            bookingId: req.params.id,
            paymentType: req.body.paymentType,
            paymentStatus: req.body.paymentStatus,
            paymentAmount: req.body.paymentAmount
        });
        await newPayment.save();
        res.status(200).json(newPayment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// view all payments
async function viewAllPayments(req, res) {
    try {
        const payments = await Payment.find({ userId: req.user._id });
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    userRegister,
    userLogin,
    viewAllEvents,
    viewEventById,
    bookEvent,
    viewAllBookings,
    viewBookingById,
    cancelBooking,
    makePayment,
    viewAllPayments
}




