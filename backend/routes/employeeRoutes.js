
const express = require('express')
const router = express.Router()

const employeeController = require('../controllers/employeeController')
const employeeAuth = require('../middlewares/employee/employeeAuthMiddleware');

router.post('/login', employeeAuth, employeeController.employeeLogin)
router.post('/change-password', employeeAuth, employeeController.changePassword)


module.exports = router

