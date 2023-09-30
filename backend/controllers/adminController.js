const express = require('express');
const router = express.Router();

const Employee = require('../models/modules/employeeSchema');
const Admin = require('../models/modules/adminSchema');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



// create employee
async function createEmployee(req, res) {
    try {
        // check if employee already exists
        const employeeExists = await Employee.findOne({ email: req.body.email });
        if (employeeExists) {
            res.status(400).json({ message: 'Employee already exists' });
        }
        // encrypt the password from the request body
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
       
        const employee = new Employee({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            address: req.body.address
        });
        await employee.save();
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// get all employees
async function getAllEmployees(req, res) {
    try {
        const employees = await Employee.find().select('-password');
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// get employee by id
async function getEmployeeById(req, res) {
    try {
        const employee = await Employee.findById(req.params.id).select('-password');
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// update employee
async function updateEmployee(req, res) {
    try {
        const employee = await Employee.findById(req.params.id);
        if (employee) {
            employee.name = req.body.name || employee.name;
            employee.email = req.body.email || employee.email;
            employee.phone = req.body.phone || employee.phone;
            employee.salary = req.body.salary || employee.salary;
            employee.picture = req.body.picture || employee.picture;
            employee.position = req.body.position || employee.position;
            employee.save();
            res.status(200).json(employee);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// delete employee
async function deleteEmployee(req, res) {
    try {
        const employee = await Employee.findById(req.params.id);
        if (employee) {
            await employee.remove();
            res.status(200).json({ message: 'Employee deleted' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// admin checkAuth
async function checkAuth(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const adminId = decodedToken._id;
        const admin = await Admin.findById(adminId).select('-password');
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// admin login
async function adminLogin(req, res) {
    try {
        const admin = await Admin.findOne({ email: req.body.email, password: req.body.password });
        if (admin) {
            // generate jwt token with 1 hour expiration
            const token = jwt.sign({ _id: admin._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token: token, message: 'Login successful' });
        } else {
            res.status(404).json({ message: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    adminLogin,
    checkAuth
}