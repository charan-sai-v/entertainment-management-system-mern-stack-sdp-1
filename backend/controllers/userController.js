
const User = require('../models/modules/userSchema')
const Event = require('../models/eventSchema')
const Booking = require('../models/bookingSchema')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// generate random token
const crypto = require('crypto');
const sendMail = require('../utils/mail');
require('dotenv').config({ path: '.env.local' });

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27'
});

// user register
async function userRegister(req, res) {
    try {
      // check if password and confirm password match
      if (req.body.password !== req.body.confirm_password) {
          return res.status(400).json({ message: 'Passwords do not match' });
      }
      // check if user email or phone number already exists
      const existingUser = await User.findOne({
          $or: [{ email: req.body.email }, { phone: req.body.phone }]
      });
        
      if (existingUser) {
        if (existingUser.email === req.body.email) {
          return res.status(409).json({ message: 'Email already exists' });
        } else {
          return res.status(409).json({ message: 'Phone number already exists' });
        }
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
          html: `<p>Click <a href="${process.env.CLIENT_URL}/verify/${token}">here</a> to verify your email</p>`
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
        user.token_expires = undefined;
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

// user dashboard by category
async function userDashboardByCategory(req, res) {
    try {
        const today = new Date();
        // view all events that should be displayed on the dashboard
        const events = await Event.find({ end_registration: { $gte: today }, status: "approved", category: req.params.category }).sort({ start_date: 1 })
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
            return res.status(200).json({ message: 'Event registration is closed', event: event });
        }

        const booking = await Booking.findOne({ event: req.params.id, user: req.id });

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
        const booking = await Booking.findOne({ event_id: event._id, user_id: req.id }); 
        if (booking) {
            return res.status(400).json({ message: 'You have already booked this event' });
        }

        const user = await User.findById(req.id);

        // create a booking
        const newBooking = new Booking({
            user: user,
            event: event,
            user_id: req.id,
            event_id: req.params.id,
            no_of_tickets: req.body.tickets,
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
        const bookings = await Booking.find({ user_id: req.id });
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
        const existBooking = await Booking({ user_id: req.id, event_id: req.params.event_id });
        if (existBooking.payment_status === 'paid') {
            return res.status(400).json({ message: 'Payment already made' });
        }
        const user = await User.findById(req.id);
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        const event = await Event.findById(req.params.event_id);
        if (!event) {
            return res.status(400).json({ message: 'Event does not exist' });
        }
        const tickets = req.body.tickets;
        const booking = await Booking({
            user_id: req.id,
            event_id: req.params.event_id,
            user: user,
            event: event,
            no_of_tickets: tickets,
            payment_status: 'pending',
            payment_amount: req.body.tickets * event.price
        });
        await booking.save();
        
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: `${process.env.CLIENT_URL}/payment/success/${booking._id}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/payment/cancel/${booking._id}?session_id={CHECKOUT_SESSION_ID}`,
            payment_method_types: ['card'],
            mode: 'payment',
            billing_address_collection: 'auto',
            customer_email: user.email,
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: event.name,
                            description: event.description,
                            // images: [event.image]
                        },
                        unit_amount: tickets * event.price * 100,
                    },
                    quantity: 1,
                }
            ],
            metadata: {
                booking_id: booking._id.toString(),
                user_id: user._id.toString(),
                event_id: event._id.toString(),
                no_of_tickets: tickets.toString()
            }
        });

        console.log(stripeSession);
        res.status(200).json({ url: stripeSession.url });
       
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// check payment status
async function checkPaymentStatus(req, res) {
    try {
        const session_id = String(req.params.session_id);
        const stripeSession = await stripe.checkout.sessions.retrieve(session_id);
        console.log(stripeSession);
        if (stripeSession.payment_status === 'paid') {
            const booking = await Booking.findById(stripeSession.metadata.booking_id);
            booking.payment_status = 'paid';
            booking.payment_id = stripeSession.payment_intent;
            await booking.save();
            const event = await Event.findById(booking.event_id);
            event.no_of_participants = event.no_of_participants + booking.no_of_tickets;
            await event.save();
            res.status(200).json({ message: 'Payment successful' });
        } else {
            booking.payment_status = 'failed';
            await booking.save();
            res.status(400).json({ message: 'Payment failed' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



// view all payments
async function viewAllPayments(req, res) {
    
}

// view profile 
async function viewProfile(req, res) {
    try {
        const user = await User.findById(req.id);
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    userRegister,
    userVerify,
    userLogin,
    userDashboard,
    userDashboardByCategory,
    viewAllEvents,
    viewEventById,
    bookEvent,
    viewAllBookings,
    viewBookingById,
    cancelBooking,
    makePayment,
    checkPaymentStatus,
    viewAllPayments,
    viewProfile
}




