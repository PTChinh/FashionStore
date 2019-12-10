const db = require('../src/database/connection');
const product = require('../src/models/product.model');

module.exports.index = (req, res) => {
    res.render('product/repo');
};