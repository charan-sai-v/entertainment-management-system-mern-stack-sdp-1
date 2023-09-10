
<<<<<<< HEAD
=======

>>>>>>> ac24a633c39531ac58c9cfc0cbefb6aeae10dcfd
const express = require('express');
const router = express.Router();

const organizerController = require('../controllers/organizerController');
const organizerAuth = require('../middlewares/organizer/organizerAuthMiddleware');


<<<<<<< HEAD
router.post('/login', organizerController.organizerLogin);
router.post('/register', organizerController.organizerRegister);

router.post('/create-event', organizerAuth, organizerController.createEvent);
router.get('/all-events', organizerAuth, organizerController.getAllEvents);
router.get('/event/:id', organizerAuth, organizerController.getEventById);
router.patch('/event/:id', organizerAuth, organizerController.updateEvent);
router.delete('/event/:id', organizerAuth, organizerController.deleteEvent);

module.exports = router;
=======
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

>>>>>>> ac24a633c39531ac58c9cfc0cbefb6aeae10dcfd
