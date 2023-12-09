
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const userAuth = require('../middlewares/user/userAuthMiddleware');


router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);
router.get('/verify/:token', userController.userVerify)

router.get('/dashboard', userAuth, userController.userDashboard);
router.get('/dashboard/:category', userAuth, userController.userDashboardByCategory);
router.get('/all-events', userAuth, userController.viewAllEvents);
router.get('/event/:id', userAuth, userController.viewEventById);
router.post('/book-event/:id', userAuth, userController.bookEvent);
router.get('/all-bookings', userAuth, userController.viewAllBookings);
router.get('/booking/:id', userAuth, userController.viewBookingById);
router.delete('/cancel-booking/:id', userAuth, userController.cancelBooking);
router.post('/make-payment/:event_id', userAuth, userController.makePayment);
router.get('/check-payment/:session_id', userAuth, userController.checkPaymentStatus);
router.get('/all-payments', userAuth, userController.viewAllPayments);
router.get('/profile', userAuth, userController.viewProfile);


module.exports = router;