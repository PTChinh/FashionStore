const express = require('express');

const controller = require('../controllers/user.controller');
const userMiddleware = require('../middleware/user.middleware');
const router = express.Router();

router.get('/cart', controller.cart);
router.post('/cart', controller.removeFromCart);
router.put('/cart', controller.order);
router.get('/info', userMiddleware.requireAuthUser, controller.info);
router.put('/info', userMiddleware.requireAuthUser, controller.changePassword);
router.post('/info',userMiddleware.requireAuthUser, controller.postUserLogin);

module.exports = router;