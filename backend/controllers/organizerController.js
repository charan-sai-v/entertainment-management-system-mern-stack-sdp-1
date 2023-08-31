
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Organizer = require('../models/modules/organizerSchema');
const Event = require('../models/eventSchema');

// organizer register
async function register(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const organizer = new Organizer({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPassword,
            address: req.body.address
        });
        await organizer.save();
        res.status(200).json(organizer);
    } catch (error) {
        res.status(500).json({ message: error.message });      
    }
}

// organizer login
async function login(req, res) {
    try {
        // check if organizer exists
        const organizer = await Organizer.findOne({ email: req.body.email });
        if (!organizer) {
            res.status(400).json({ message: 'Organizer does not exist' });
        }
        // check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, organizer.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Password is incorrect' });
        }
        // create and assign a token
        const token = jwt.sign({ _id: organizer._id }, process.env.TOKEN_SECRET);
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// create an event
async function createEvent(req, res) {
    try {
        const event = new Event({
            name: req.body.name,
            description: req.body.description,
            image: req.file.buffer,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            location: req.body.location,
            capacity: req.body.capacity,
            organizerId: req.body.organizerId,
            organizerName: req.body.organizerName
        });
        await event.save();
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// get all organizer events
async function getAllEvents(req, res) {
    try {
        const events = await Event.find({ organizerId: req.params.id });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// get event by id
async function getEventById(req, res) {
    try {
        const event = await Event.findById(req.params.id);
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
            if (event.organizerId !== req.body.organizerId) {
                res.status(401).json({ message: 'Unauthorized' });
            }
            await event.remove();
            res.status(200).json({ message: 'Event deleted successfully' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

