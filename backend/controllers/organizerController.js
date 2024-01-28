
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const Organizer = require('../models/modules/organizerSchema');
const Event = require('../models/eventSchema');
const moment = require('moment-timezone');
const sendMail = require('../utils/mail');


require('dotenv').config({ path: '.env.local' });


// organizer register
async function organizerRegister(req, res) {
    try {
        // check if organizer already exists
        const existsOrganizer = await Organizer.findOne({ email: req.body.email });
        if (existsOrganizer) {
            return res.status(400).json({ message: 'Organizer already exists' });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const token = crypto.randomBytes(32).toString('hex');
        const organizer = new Organizer({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPassword,
            company: req.body.company,
            token: token,
            token_expiry: Date.now() + 3600000, // 1 hour
        });
        await organizer.save();
        await sendMail({
            to: organizer.email,
            subject: 'Email Verification',
            html: `<p>Click <a href="${process.env.CLIENT_URL}/organizer/verify/${token}">here</a> to verify your email</p>`
        });
        res.status(200).json({ message: 'Organizer registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });      
    }
}

// organizer verify
async function organizerVerify(req, res) {
    try {
        const token = req.params.token;
        if (!token) {
            return res.status(400).json({ message: 'Token not found' });
        }
        const organizer = await Organizer.findOne({ token: token });
        if (!organizer) {
            return res.status(400).json({ message: 'Organizer not found' });
        }
        if  (organizer.is_verified) {
            return res.status(400).json({ message: 'Organizer already verified' });
        }
        // check if token is expired
        if (organizer.token_expiry < Date.now()) {
            user.token = '';
            user.token_expiry = undefined;
            await user.save();
            return res.status(400).json({ message: 'Token expired' });
        }
        organizer.is_verified = true;
        organizer.token = '';
        organizer.token_expiry = undefined;
        await organizer.save();
        res.status(200).json({ message: 'Organizer verified successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// organizer login
async function organizerLogin(req, res) {
    try {
        const organizer = await Organizer.findOne({ email: req.body.email });
        if (!organizer) {
            return res.status(400).json({ message: 'Organizer does not exist' });
        }

        const validPassword = await bcrypt.compare(req.body.password, organizer.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Password is incorrect' });
        }
        if (!organizer.is_verified) {
            return res.status(400).json({ message: 'Organizer is not verified' });
        }

        const token = jwt.sign({ _id: organizer._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token: token, role: 'organizer', message: 'Login successful', id: organizer._id });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// organizer resend verification email
async function organizerResendVerificationEmail(req, res) {
    try {
        const email = req.body.email;
        if (!email) {
            return res.status(400).json({ message: 'Email not found' });
        }
        const organizer = await Organizer.findOne({ email: email });
        if (!organizer) {
            return res.status(400).json({ message: 'Organizer not found' });
        }
        if (organizer.is_verified) {
            return res.status(400).json({ message: 'Organizer already verified' });
        }
        const token = crypto.randomBytes(32).toString('hex');
        organizer.token = token;
        organizer.token_expiry = Date.now() + 3600000; // 1 hour
        await organizer.save();
        await sendMail({
            to: organizer.email,
            subject: 'Email Verification',
            html: `<p>Click <a href="${process.env.CLIENT_URL}/organizer/verify/${token}">here</a> to verify your email</p>`
        });
        res.status(200).json({ message: 'Verification email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// organizer forgot password
async function organizerForgotPassword(req, res) {
    try {
        const email = req.body.email;
        if (!email) {
            return res.status(400).json({ message: 'Email not found' });
        }
        const organizer = await Organizer.findOne({ email: email });
        if (!organizer) {
            return res.status(400).json({ message: 'Organizer not found' });
        }
        const token = crypto.randomBytes(32).toString('hex');
        organizer.token = token;
        organizer.token_expiry = Date.now() + 3600000; // 1 hour
        await organizer.save();
        await sendMail({
            to: organizer.email,
            subject: 'Reset Password',
            html: `<p>Click <a href="${process.env.CLIENT_URL}/organizer/reset-password/${token}">here</a> to reset your password</p>`
        });
        res.status(200).json({ message: 'Reset password email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// organizer reset password
async function organizerResetPassword(req, res) {
    try {
        const token = req.params.token;
        if (!token) {
            return res.status(400).json({ message: 'Token not found' });
        }
        const organizer = await Organizer.findOne({ token: token });
        if (!organizer) {
            return res.status(400).json({ message: 'Organizer not found' });
        }
        // check if token is expired
        if (organizer.token_expiry < Date.now()) {
            organizer.token = '';
            organizer.token_expiry = undefined;
            await organizer.save();
            return res.status(400).json({ message: 'Token expired' });
        }
        // check if password and confirm password are same
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({ message: 'Password and confirm password are not same' });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        organizer.password = hashedPassword;
        organizer.token = '';
        organizer.token_expiry = undefined;
        await organizer.save();
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// create an event
async function createEvent(req, res) {
    console.log(req.body);
    try {
        const organizer = await Organizer.findOne({ _id: req.id });
        // check organizer is filled bank account
        if (!organizer.is_bank_account) {
            return res.status(401).json({ message: 'Organizer is not filled bank account' });
        }
        const organizerName = organizer.name;
        const organizerCompany = organizer.company;
        const startRegistrationDate = new Date(req.body.startRegistrationDate);
        const endRegistrationDate = new Date(req.body.endRegistrationDate);
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        const event = new Event({
            name: req.body.name,
            description: req.body.description,
            image: `http://localhost:8080/uploads/events/${req.file.filename}`,
            start_date: startDate,
            end_date: endDate,
            start_registration: startRegistrationDate,
            end_registration: endRegistrationDate,
            is_cancelable: (req.body.is_cancelable === 'true') ? true : false,
            location: req.body.location,
            capacity: req.body.capacity,
            price: req.body.price,
            category: req.body.category,
            organizerId: req.id,
            organizerName: organizerName,
            organizerCompany: organizerCompany,
            created_at: moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
            updated_at: moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss')
        });
        if (req.body.is_cancelable === 'true') {
            event.cancel_deadline = new Date(req.body.cancel_deadline);
        }
        await event.save();
        res.status(200).json(event);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


// get all organizer events
async function getEvents(req, res) {
    try {
        // check if organizer is bank account filled
        const organizer = await Organizer.findOne({ _id: req.id });
        if (!organizer.is_bank_account) {
            return res.status(401).json({ message: 'Organizer is not filled bank account' });
        }
        const events = await Event.find({ organizerId: req.id });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// get event by id
async function getEventById(req, res) {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        if (event.organizerId.toString() !== req.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// update event by id
async function updateEvent(req, res) {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            // check if organizer is the owner of the event
            if (event.organizerId !== req.body.organizerId) {
                res.status(401).json({ message: 'Unauthorized' });
            }
            event.name = req.body.name || event.name;
            event.description = req.body.description || event.description;
            event.image = req.file.buffer || event.image;
            event.start_date = req.body.start_date || event.start_date;
            event.end_date = req.body.end_date || event.end_date;
        }
        await event.save();
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// delete event by id
async function deleteEvent(req, res) {
    try {
        const event = await Event.findById(req.params.id);
        
        if (event) {
            // check if organizer is the owner of the event
            if (event.organizerId.toString() !== req.id) {
                res.status(401).json({ message: 'Unauthorized' });
            }
            await event.deleteOne();
            res.status(200).json({ message: 'Event deleted' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// organizer settings
async function organizerSettings(req, res) {
    try {
        const organizer = await Organizer.findOne({ _id: req.id });
        if (!organizer) {
            return res.status(404).json({ message: 'Organizer not found' });
        }
        organizer.name = req.body.name || organizer.name;
        organizer.email = req.body.email || organizer.email;
        organizer.phone = req.body.phone || organizer.phone;
        organizer.company = req.body.company || organizer.company;
        organizer.is_bank_account = req.body.is_bank_account || organizer.is_bank_account;
        organizer.bank_account_name = req.body.bank_account_name || organizer.bank_account_name;
        organizer.bank_account_number = req.body.bank_account_number || organizer.bank_account_number;
        organizer.bank_ifsc_code = req.body.bank_ifsc_code || organizer.bank_ifsc_code;
        organizer.bank_name = req.body.bank_name || organizer.bank_name;
        organizer.updated_at = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
        await organizer.save();
        res.status(200).json(organizer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// check if organizer is filled bank account
async function organizerIsBankAccount(req, res) {
    try {
        const organizer = await Organizer.findOne({ _id: req.id });
        if (!organizer) {
            return res.status(404).json({ message: 'Organizer not found' });
        }
        if (!organizer.is_bank_account) {
            return res.status(401).json({ message: 'Organizer is not filled bank account' });
        }
        res.status(200).json(organizer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// organizer update bank account
async function organizerUpdateBankAccount(req, res) {
    try {
        const organizer = await Organizer.findOne({ _id: req.id });
        if (!organizer) {
            return res.status(404).json({ message: 'Organizer not found' });
        }
        console.log(req.body);
        organizer.is_bank_account = req.body.is_bank_account || organizer.is_bank_account;
        organizer.bank_account_name = req.body.bank_account_name || organizer.bank_account_name;
        organizer.bank_account_number = req.body.bank_account_number || organizer.bank_account_number;
        organizer.bank_ifsc_code = req.body.bank_ifsc_code || organizer.bank_ifsc_code;
        organizer.bank_name = req.body.bank_name || organizer.bank_name;
        organizer.updated_at = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
        await organizer.save();
        res.status(200).json(organizer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// organizer dashboard
async function organizerDashboard(req, res) {
    try {
        // no of total events
        const events = await Event.find({ organizerId: req.id });
        const totalEvents = events.length;
        // no of total user registrations
        let totalRegistrations = 0;
        events.forEach(event => {
            totalRegistrations += event.no_of_participants;
        });
        // no of total revenue
        let totalRevenue = 0;
        events.forEach(event => {
            totalRevenue += event.no_of_participants * event.price;
        });
        // Current month revenue
        let currentMonthRevenue = 0;
        events.forEach(event => {
            if (moment().tz('Asia/Kolkata').format('YYYY-MM') === moment(event.created_at).tz('Asia/Kolkata').format('YYYY-MM')) {
                currentMonthRevenue += event.no_of_participants * event.price;
            }
        });

        // upcoming 5 events
        const upcomingEvents = await Event.find({ organizerId: req.id, start_date: { $gte: new Date() } }).limit(5);
        
        // past 5 events
        const pastEvents = await Event.find({ organizerId: req.id, start_date: { $lt: new Date() } }).limit(5);

        // cancelled 5 events
        const cancelledEvents = await Event.find({ organizerId: req.id, status: 'cancelled' }).limit(5);

        return res.status(200).json({ totalEvents: totalEvents, totalRegistrations: totalRegistrations, totalRevenue: totalRevenue, currentMonthRevenue: currentMonthRevenue, upcomingEvents: upcomingEvents, pastEvents: pastEvents, cancelledEvents: cancelledEvents });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// organizer profile
async function organizerProfile(req, res) {
    try {
        const organizer = await Organizer.findOne({ _id: req.id });
        if (!organizer) {
            return res.status(404).json({ message: 'Organizer not found' });
        }
        res.status(200).json(organizer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    organizerLogin,
    organizerVerify,
    organizerResendVerificationEmail,
    organizerForgotPassword,
    organizerResetPassword,
    organizerRegister,
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    organizerSettings,
    organizerIsBankAccount,
    organizerUpdateBankAccount,
    organizerDashboard,
    organizerProfile
}