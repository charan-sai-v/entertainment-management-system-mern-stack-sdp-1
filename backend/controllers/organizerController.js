
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Organizer = require('../models/modules/organizerSchema');
const Event = require('../models/eventSchema');
const moment = require('moment-timezone');



// organizer register
async function organizerRegister(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const organizer = new Organizer({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPassword,
            company: req.body.company
        });
        await organizer.save();
        res.status(200).json(organizer);
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

        const token = jwt.sign({ _id: organizer._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token: token, role: 'organizer', message: 'Login successful', id: organizer._id });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}



// create an event
async function createEvent(req, res) {
    console.log(req.body);
    try {
        const organizer = await Organizer.findOne({ _id: req.id });
        const organizerName = organizer.name;
        const organizerCompany = organizer.company;
        const startRegistrationDate = new Date(req.body.startRegistrationDate);
        const endRegistrationDate = new Date(req.body.endRegistrationDate);
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        const cancelDeadline = new Date(req.body.cancel_deadline);
        const event = new Event({
            name: req.body.name,
            description: req.body.description,
            image: `http://localhost:8080/uploads/events/${req.file.filename}`,
            start_date: startDate,
            end_date: endDate,
            start_registration: startRegistrationDate,
            end_registration: endRegistrationDate,
            cancel_deadline: cancelDeadline,
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



module.exports = {
    organizerLogin,
    organizerRegister,
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
}