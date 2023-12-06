
const User = require('../models/modules/userSchema')
const Event = require('../models/eventSchema')
const Booking = require('../models/bookingSchema')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// generate random token
const crypto = require('crypto');
const sendMail = require('../utils/mail');
const dotenv = require('dotenv');

dotenv.config();

// user register
async function userRegister(req, res) {
    try {
        // check if password and confirm password match
        if (req.body.password !== req.body.confirm_password) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        // check if user email exists
        const exitsUser = await User.findOne({ email: req.body.email });
        if (exitsUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const token = crypto.randomBytes(32).toString('hex');
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            password: hashedPassword,
            token: token,
            token_expires: Date.now() + 3600000 // 1 hour
        });
        await user.save();
        await sendMail({
            to: user.email,
            subject: 'Email Verification',
            html: `<h1>Click <a href="${process.env.CLIENT_URL}/verify/${token}">here</a> to verify your email</h1>`
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });      
    }
}

// user verify
async function userVerify(req, res) {
    try {
        const token = req.params.token;
        if (!token) {
            return res.status(400).json({ message: 'Token not found' });
        }
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }
        if (user.is_verified) {
            return res.status(409).json({message: 'User Already verified'});
        }
        // check if user expired
        if (user.token_expires < Date.now()) {
            user.token = '';
            user.token_expires = undefined;
            await user.save();
            return res.status(400).json({ message: 'Token expired' });
        }
        user.is_verified = true;
        user.token = '';
        await user.save();
        res.status(200).json({ message: 'User verified' });
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
            return res.status(400).json({ message: 'User does not exist' });
        }
        // check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Password is incorrect' });
        }
        // check if user is verified
        if (!user.is_verified) {
            return res.status(400).json({ message: 'User is not verified' });
        }
        // create and assign a token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
        res.status(200).json({ token: token , message: 'Login successful', id: user._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// user dashboard
async function userDashboard(req, res) {
    try {
        const today = new Date();
        // view all events that should be displayed on the dashboard 
        const events = await Event.find({ end_registration: { $gte: today }, status: "approved" }).sort({ start_date: 1 })
        res.status(200).json(events);
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


async function viewEventById(req, res) {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(400).json({ message: 'Event does not exist' });
        }

        if (event.status !== 'approved') {
            return res.status(400).json({ message: 'Event is not approved' });
        }

        if (event.no_of_participants === event.capacity) {
            return res.status(400).json({ message: 'Event is full' });
        }

        const today = new Date();

        if (event.end_registration < today) {
            return res.status(400).json({ message: 'Event registration is closed' });
        }

        const booking = await Booking.findOne({ event_id: req.params.id, user_id: req.id });

        if (booking) {
            return res.status(400).json({ message: 'Already booked', event: event });
        }

        return res.status(200).json({ message: 'Event is available', event: event });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


// book an event
async function bookEvent(req, res) {
    try {
        // check if event capacity is full
        const event = await Event.findById(req.params.id);
        if (event.no_of_participants === event.capacity) {
            return res.status(400).json({ message: 'Event capacity is full' });
        }
        // check if user has already booked the event
        const booking = await Booking.findOne({ userId: req.id, eventId: req.params.id });
        if (booking) {
            return res.status(400).json({ message: 'You have already booked this event' });
        }

        // create a booking
        const newBooking = new Booking({
            user_id: req.id,
            event_id: req.params.id,
            no_of_tickets: req.body.tickets,
            event_name: event.name,
            user_name: 'charan sai',
            payment_status: 'pending',
            payment_id: '',
            payment_amount: req.body.tickets * event.price
        });
        await newBooking.save();
        // update event no of participants and capacity
        event.no_of_participants = event.no_of_participants + req.body.tickets;
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
            return res.status(400).json({ message: 'Booking does not exist' });
        }
        // check if event start date is 5 hours away
        const event = await Event.findById(booking.eventId);
        const eventStartDate = new Date(event.start_date);
        const currentDate = new Date();
        const timeDifference = eventStartDate.getTime() - currentDate.getTime();
        const hoursDifference = timeDifference / (1000 * 3600);
        if (hoursDifference <= 5) {
            return res.status(400).json({ message: 'You cannot cancel this booking' });
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
        
        // if (payment) {
        //     res.status(400).json({ message: 'Payment has already been made' });
        // }
        // create a payment
       
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// view all payments
async function viewAllPayments(req, res) {
    
}



module.exports = {
    userRegister,
    userVerify,
    userLogin,
    userDashboard,
    viewAllEvents,
    viewEventById,
    bookEvent,
    viewAllBookings,
    viewBookingById,
    cancelBooking,
    makePayment,
    viewAllPayments
}




