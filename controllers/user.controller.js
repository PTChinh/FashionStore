const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require('../src/database/connection');

module.exports.cart = (req, res) => {
    res.render('user/cart');
};

module.exports.info = (req, res) => {
    res.render('user/info');
};