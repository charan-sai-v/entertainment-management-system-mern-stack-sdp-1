
const express = require('express');
const router = express.Router();

const upload = require('../middlewares/multerConfig').single('image');

const organizerController = require('../controllers/organizerController');
const organizerAuth = require('../middlewares/organizer/organizerAuthMiddleware');


router.post('/login', organizerController.organizerLogin);
router.post('/register', organizerController.organizerRegister);

router.post('/create-event',upload, organizerController.createEvent);
router.get('/events', organizerAuth, organizerController.getEvents);
router.get('/event/:id', organizerAuth, organizerController.getEventById);
router.patch('/event/:id', organizerAuth, organizerController.updateEvent);
router.delete('/event/:id', organizerAuth, organizerController.deleteEvent);

module.exports = router;