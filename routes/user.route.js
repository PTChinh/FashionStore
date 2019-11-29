const express = require('express');

const controller = require('../controllers/user.controller');

const router = express.Router();

router.get('/cart', controller.cart);
module.exports = router;