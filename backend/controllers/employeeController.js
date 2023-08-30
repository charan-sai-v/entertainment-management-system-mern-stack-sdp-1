
const Employee = require('../models/modules/employeeSchema');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// employee login
async function employeeLogin(req, res) {
    try{
        const decryptedPassword = await bcrypt.compare(req.body.password, req.employee.password);
        if(!decryptedPassword){
            return res.status(400).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ _id: req.employee._id }, process.env.TOKEN_SECRET);
        res.status(200).json({ token: token });
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
        await req.employee.save();
        res.status(200).json({ message: 'Password changed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { employeeLogin, changePassword };