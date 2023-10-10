
const express = require('express')
const router = express.Router()

const employeeController = require('../controllers/employeeController')
const employeeAuth = require('../middlewares/employee/employeeAuthMiddleware');

router.post('/login', employeeController.employeeLogin)
router.post('/change-password', employeeAuth, employeeController.changePassword)
router.get('/organizers', employeeAuth, employeeController.viewAllOrganizer)
router.get('/organizers/:id', employeeAuth, employeeController.viewOrganizerById)
router.get('/events', employeeAuth, employeeController.viewAllEvents)
router.get('/event/:id', employeeAuth, employeeController.viewEventById)
router.put('/event/update/:id', employeeAuth, employeeController.updateEventStatus)


router.get('/view-all-organizer', employeeAuth, employeeController.viewAllOrganizer)
router.get('/view-organizer-by-id/:id', employeeAuth, employeeController.viewOrganizerById)
router.get('/view-event-by-id/:id', employeeAuth, employeeController.viewEventById)
router.get('/view-all-users', employeeAuth, employeeController.viewAllUsers)
router.get('/view-user-by-id/:id', employeeAuth, employeeController.viewUserById)


module.exports = router

