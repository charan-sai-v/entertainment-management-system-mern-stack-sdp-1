const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const adminAuth = require('../middlewares/admin/adminAuthMiddleware');

router.post('/create-employee', adminAuth, adminController.createEmployee);
router.get('/get-all-employees', adminAuth, adminController.getAllEmployees);
router.get('/get-employee-by-id/:id', adminAuth, adminController.getEmployeeById);
router.put('/update-employee/:id', adminAuth, adminController.updateEmployee);
router.delete('/delete-employee/:id', adminAuth, adminController.deleteEmployee);

// admin login
router.post('/login', adminController.adminLogin);


module.exports = router;

