
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
