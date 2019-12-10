const express = require('express');

const controller = require('../controllers/user.controller');

const router = express.Router();

router.get('/cart', controller.cart);
router.get('/info', controller.info);
router.put('/info', controller.changePassword);
module.exports = router;