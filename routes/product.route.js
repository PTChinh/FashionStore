const express = require('express');

const controller = require('../controllers/product.controller');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/clothes', controller.clothes);
router.get('/backpack', controller.backpack);
router.get('/shoe', controller.shoe);
router.get('/accessories', controller.accessories);
router.post('/*', userController.postUserLogin);

module.exports = router;