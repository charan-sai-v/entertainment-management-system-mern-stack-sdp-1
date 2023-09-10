
const router = require('express').Router();

const userController = require('../controllers/userController');
const userAuth = require('../middlewares/user/userAuthMiddleware');


router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);

router.get('/all-events', userAuth, userController.viewAllEvents);
router.get('/event/:id', userAuth, userController.viewEventById);
router.post('/book-event', userAuth, userController.bookEvent);
router.get('/all-bookings', userAuth, userController.viewAllBookings);
router.get('/booking/:id', userAuth, userController.viewBookingById);
router.delete('/cancel-booking/:id', userAuth, userController.cancelBooking);
router.post('/make-payment', userAuth, userController.makePayment);
router.get('/all-payments', userAuth, userController.viewAllPayments);


module.exports = router;

