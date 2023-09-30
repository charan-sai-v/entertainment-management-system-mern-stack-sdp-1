
const Employee = require('../models/modules/employeeSchema');
const Organizer = require('../models/modules/organizerSchema')
const Event = require('../models/eventSchema')
const User = require('../models/userSchema')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// employee login
async function employeeLogin(req, res) {
    try{
        const employee = await Employee.findOne({ email: req.body.email });
        if(!employee){
            return res.status(400).json({ message: 'Invalid email' });
        }
        const decryptedPassword = await bcrypt.compare(req.body.password, employee.password);
        if (!decryptedPassword){
            return res.status(400).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ _id: employee._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token: token, message: 'Login successful', role: employee.role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// change password
async function changePassword(req, res) {
    try{
        const decryptedPassword = await bcrypt.compare(req.body.oldPassword, req.employee.password);
        if(!decryptedPassword){
            return res.status(400).json({ message: 'Invalid password' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
        req.employee.password = hashedPassword;
        req.employee.is_password_changed = true;
        await req.employee.save();
        res.status(200).json({ message: 'Password changed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// view all organizers
async function viewAllOrganizer(req, res) {
    try {
        const organizers = await Organizer.findAll().select('-password');
        res.status(200).json(organizers)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


// view organizer by id
async function viewOrganizerById(req, res) {
     try {
        const organizer = await Organizer.findById(req.params.id).select('-password')
        res.status(200).json(organizer)
     } catch (error) {
        res.status(500).json({message: error.message})
     }
}

// view all events
async function viewAllEvents(req, res) {
    try {
        const events = await Event.findAll();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// view event by id
async function viewEventById(req, res) {
    try {
        const event = await Event.findById(req.params.id)
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// view all users
async function viewAllUsers(req, res) {
    try {
        const users = await User.findAll().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// view user by id
async function viewUserById(req, res) {
    try {
        const user = await User.findById(req.params.id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}




module.exports = { 
    employeeLogin,
    changePassword,
    viewAllOrganizer,
    viewOrganizerById,
    viewAllEvents,
    viewEventById,
    viewAllUsers,
    viewUserById
}