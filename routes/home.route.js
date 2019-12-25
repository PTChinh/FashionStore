const express = require('express');

const router = express.Router();
const controller = require('../controllers/home.controller');

router.get('/', controller.home);
router.get('/transport', controller.transport);
router.get('/about', controller.about);
router.get('/buytips', controller.buytips);

module.exports = router;