const express = require('express');

const controller = require('../controllers/product.controller');

const router = express.Router();

router.get('/clothes', controller.clothes);
router.get('/backpack', controller.backpack);
router.get('/shoe', controller.shoe);
router.get('/accessories', controller.accessories);
router.get('/detail', controller.detail);

module.exports = router;