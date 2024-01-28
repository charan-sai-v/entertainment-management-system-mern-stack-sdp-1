
const express = require('express');
const router = express.Router();

const upload = require('../middlewares/multerConfig').single('image');

const organizerController = require('../controllers/organizerController');
const organizerAuth = require('../middlewares/organizer/organizerAuthMiddleware');

// Public Routes
router.post('/login', organizerController.organizerLogin);
router.post('/register', organizerController.organizerRegister);
router.get('/verify/:token', organizerController.organizerVerify);
router.post('/resend-verification', organizerController.organizerResendVerificationEmail);
router.post('/forgot-password', organizerController.organizerForgotPassword);
router.post('/reset-password/:token', organizerController.organizerResetPassword);


// Protected Routes
router.get('/dashboard', organizerAuth, organizerController.organizerDashboard);
router.post('/create-event', organizerAuth, upload, organizerController.createEvent);
router.get('/events', organizerAuth, organizerController.getEvents);
router.get('/event/:id', organizerAuth, organizerController.getEventById);
router.patch('/event/:id', organizerAuth, organizerController.updateEvent);
router.delete('/event/:id', organizerAuth, organizerController.deleteEvent);
router.get('/profile', organizerAuth, organizerController.organizerProfile);
router.get('/bank-account', organizerAuth, organizerController.organizerIsBankAccount);
router.post('/bank-account', organizerAuth, organizerController.organizerUpdateBankAccount);


module.exports = router;