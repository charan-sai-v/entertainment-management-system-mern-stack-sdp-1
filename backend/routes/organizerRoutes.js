

const express = require('express');
const router = express.Router();

const organizerController = require('../controllers/organizerController');
const organizerAuth = require('../middlewares/organizer/organizerAuthMiddleware');


router.post('/login', organizerAuth, organizerController.organizerLogin);
router.post('/register', organizerController.organizerRegister);
router.post('/events', organizerAuth, organizerController.createEvent);
router.get('/employees', organizerAuth, organizerController.getAllEmployees);
router.get('/employees/:id', organizerAuth, organizerController.getEmployeeById);
router.get('/events', organizerAuth, organizerController.getAllEvents);
router.get('/events/:id', organizerAuth, organizerController.getEventById);
router.patch('/events/:id', organizerAuth, organizerController.updateEvent);
router.delete('/events/:id', organizerAuth, organizerController.deleteEvent);


module.exports = router;

