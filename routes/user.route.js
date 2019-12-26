const express = require('express');
const multer = require('multer');

const controller = require('../controllers/user.controller');
const userMiddleware = require('../middleware/user.middleware');
const router = express.Router();
const upload = multer({dest: './public/images/user/'});

router.get('/cart', controller.cart);
router.post('/cart', controller.removeFromCart);
router.put('/cart', controller.order);
router.get('/info', userMiddleware.requireAuthUser, controller.info);
router.put('/info', userMiddleware.requireAuthUser, controller.changePassword);
router.put('/changeinfo', userMiddleware.requireAuthUser, controller.changeInfo);
router.post('/info', userMiddleware.requireAuthUser, controller.postUserLogin);
router.get('/order', controller.orderInfo);
router.get('/interested', controller.interested);
router.post('/interested', controller.addToInterested);
router.put('/interested', controller.removeFromInterested);
router.post('/avatar', upload.single('avatar'), controller.uploadAvt);
router.get('/logout', userMiddleware.requireAuthUser, controller.logOut);
router.put('/signup', controller.signUp);
router.put('/cancel', controller.cancel);
module.exports = router;