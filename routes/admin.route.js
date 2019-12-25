const express = require('express');

const controller = require('../controllers/admin.controller');
const adminMiddleware = require('../middleware/admin.middleware');

const router = express.Router();

router.get('/', (req, res) => {
   res.redirect('admin/login');
});
router.get('/login', controller.login);
router.post('/login', controller.postLogin);
router.get('/dashboard', adminMiddleware.requireAuthAdmin, controller.dashBoard);
router.get('/staff', adminMiddleware.requireAuthAdmin, controller.staff);
router.get('/user', adminMiddleware.requireAuthAdmin, controller.user);
router.get('/invoice', adminMiddleware.requireAuthAdmin, controller.invoice);
router.get('/product', adminMiddleware.requireAuthAdmin, controller.product);
router.get('/report', adminMiddleware.requireAuthAdmin, controller.report);
router.put('/staff/signup', adminMiddleware.requireAuthAdmin, controller.createStaff);
router.put('/staff/update', adminMiddleware.requireAuthAdmin, controller.updateStaff);

module.exports = router;