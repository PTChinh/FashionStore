const db = require('../src/database/connection');
const Sequelize = require('sequelize');
const product = require('../src/models/product.model');
const productDetail = require('../src/models/productDetail.model');

module.exports.clothes = (req, res) => {

    product.findAll({
       where: {
           category_id: 1
       }
    }).then(function (products) {
        res.render('product/clothes', {
            allProducts: products,
            products: products.slice(0, 9),
            cart: req.session.cart
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
            products: products.slice(0, 9),
            cart: req.session.cart
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
            products: products.slice(0, 9),
            cart: req.session.cart
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
            products: products.slice(0, 9),
            cart: req.session.cart
        });
    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    });

};

module.exports.detail = (req, res) => {

    let productId = req.query.id;
    let listProducts;

    product.findOne({
        where: {
            id: productId
        }
    }).then(function (product) {

        productDetail.findAll({
            where: {
                product_id: productId
            }
        }).then(function (products) {
            listProducts = products;
        }).catch(function (err) {
            console.log('Some thing went wrong! ' + err);
        });

        productDetail.findAll({
            group: 'image',
            where: {
                product_id: productId
            }
        }).then(function (productDetails) {
            res.render('product/detail', {
                product: product,
                productDetails: productDetails,
                listProducts: listProducts,
                cart: req.session.cart
            });
        }).catch(function (err) {
            console.log('Some thing went wrong! ' + err);
        });

    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    });

};

module.exports.addToCart = (req, res) => {
    let id = req.body.productDetailId;

    productDetail.findOne({
        where: {
            id: id
        }
    }).then(function (productItem) {
        if(productItem) {
            let isDup = false;
            if(req.session.cart) {
                let cart = req.session.cart;
                for(let i = 0; i < cart.length; i++ ) {
                    if(cart[i].id === productItem.id)
                        isDup = true;
                }
                if(!isDup)
                    req.session.cart.push(productItem);
            } else {
                req.session.cart = [productItem];
            }
            if(isDup)
                res.status(400).send({ msg: "Chỉ được thêm sản phẩm một lần."});
            else
                res.status(200).send({ msg: "Thêm sản phẩm thành công." });
        } else {
            res.status(401).send({ msg: "Không tìm thấy sản phẩm" });
        }
    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    });
};