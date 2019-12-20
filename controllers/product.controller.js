const db = require('../src/database/connection');
const product = require('../src/models/product.model');

module.exports.clothes = (req, res) => {

    product.findAll({
       where: {
           category_id: 1
       }
    }).then(function (products) {
        res.render('product/clothes', {
            allProducts: products,
            products: products.slice(0, 9)
        });
    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    });

};

module.exports.backpack = (req, res) => {

    product.findAll({
        where: {
            category_id: 2
        }
    }).then(function (products) {
        res.render('product/backpack', {
            allProducts: products,
            products: products.slice(0, 9)
        });
    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    });
};

module.exports.shoe = (req, res) => {

    product.findAll({
        where: {
            category_id: 3
        }
    }).then(function (products) {
        res.render('product/shoe', {
            allProducts: products,
            products: products.slice(0, 9)
        });
    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    });

};

module.exports.accessories = (req, res) => {

    product.findAll({
        where: {
            category_id: 4
        }
    }).then(function (products) {
        res.render('product/accessories', {
            allProducts: products,
            products: products.slice(0, 9)
        });
    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    });

};