
const express = require('express')
const router = express.Router()

const employeeController = require('../controllers/employeeController')
const employeeAuth = require('../middlewares/employee/employeeAuthMiddleware');

router.post('/login', employeeAuth, employeeController.employeeLogin)
router.post('/change-password', employeeAuth, employeeController.changePassword)
router.get('/organizers', employeeAuth, employeeController.viewAllOrganizer)
router.get('/organizers/:id', employeeAuth, employeeController.viewOrganizerById)
router.get('/events', employeeAuth, employeeController.viewAllEvents)
router.get('/events/:id', employeeAuth, employeeController.viewEventById)


module.exports = router

