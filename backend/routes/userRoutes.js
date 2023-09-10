
<<<<<<< HEAD
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

=======
const router = require('express')
const userController = require('../controllers/userController')


router.post('/register', userController.userRegister)
router.post('/login', userController.userLogin)
router.get('/events', userController.viewAllEvents)
router.get('/events/:id', userController.viewEventById)
router.post('/book', userController.bookEvent)
router.get('/bookings', userController.viewAllBookings)
router.get('/bookings/:id', userController.viewBookingById)
router.delete('/bookings/:id', userController.cancelBooking)
router.post('/payments', userController.makePayment)
router.get('/payments', userController.viewAllPayments)


module.exports = router
>>>>>>> ac24a633c39531ac58c9cfc0cbefb6aeae10dcfd
