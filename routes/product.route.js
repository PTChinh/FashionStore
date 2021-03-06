const express = require('express');

const controller = require('../controllers/product.controller');

const router = express.Router();

router.get('/clothes', controller.clothes);
router.get('/backpack', controller.backpack);
router.get('/shoe', controller.shoe);
router.get('/accessories', controller.accessories);
router.get('/detail', controller.detail);
router.post('/detail', controller.addToCart);
router.get('/search', controller.search);
router.get('/filter', controller.filter);

module.exports = router;