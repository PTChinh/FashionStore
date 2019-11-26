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

module.exports = router;