const db = require('../src/database/connection');
const Sequelize = require('sequelize');
const product = require('../src/models/product.model');
const user = require('../src/models/user.model');
const productDetail = require('../src/models/productDetail.model');

module.exports.clothes = (req, res) => {
    let page = parseInt(req.query.page) || 1; // n
    let perPage = 9; // x

    let start = (page - 1) * perPage;
    let end = page * perPage;

    let image;
    if(req.session.user) {

        user.findOne({
            where: {
                id: req.session.user.id
            }
        }).then(user => {
            image = user.image;
        });
    }
    product.findAll({
       where: {
           category_id: 1
       }
    }).then(function (products) {

        res.render('product/clothes', {
            allProducts: products,
            products: products.slice(start, end),
            cart: req.session.cart,
            hearts: req.session.heart,
            image: image
        });
    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    });

};

module.exports.backpack = (req, res) => {

    let page = parseInt(req.query.page) || 1; // n
    let perPage = 9; // x

    let start = (page - 1) * perPage;
    let end = page * perPage;

    let image;
    if(req.session.user) {
        user.findOne({
            where: {
                id: req.session.user.id
            }
        }).then(user => {
            image = user.image;
        });
    }

    product.findAll({
        where: {
            category_id: 2
        }
    }).then(function (products) {
        res.render('product/backpack', {
            allProducts: products,
            products: products.slice(start, end),
            cart: req.session.cart,
            hearts: req.session.heart,
            image: image
        });
    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    });
};

module.exports.shoe = (req, res) => {

    let page = parseInt(req.query.page) || 1; // n
    let perPage = 9; // x

    let start = (page - 1) * perPage;
    let end = page * perPage;

    let image;
    if(req.session.user) {

        user.findOne({
            where: {
                id: req.session.user.id
            }
        }).then(user => {
            image = user.image;
        });
    }

    product.findAll({
        where: {
            category_id: 3
        }
    }).then(function (products) {
        res.render('product/shoe', {
            allProducts: products,
            products: products.slice(start, end),
            cart: req.session.cart,
            hearts: req.session.heart,
            image: image
        });
    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    });

};

module.exports.accessories = (req, res) => {

    let page = parseInt(req.query.page) || 1; // n
    let perPage = 9; // x

    let start = (page - 1) * perPage;
    let end = page * perPage;

    let image;
    if(req.session.user) {

        user.findOne({
            where: {
                id: req.session.user.id
            }
        }).then(user => {
            image = user.image;
        });
    }

    product.findAll({
        where: {
            category_id: 4
        }
    }).then(function (products) {
        res.render('product/accessories', {
            allProducts: products,
            products: products.slice(start, end),
            cart: req.session.cart,
            hearts: req.session.heart,
            image: image
        });
    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    });

};

module.exports.detail = (req, res) => {

    let productId = req.query.id;
    let listProducts;
    let image;
    if(req.session.user) {

        user.findOne({
            where: {
                id: req.session.user.id
            }
        }).then(user => {
            image = user.image;
        });
    }

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
                cart: req.session.cart,
                image: image
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

module.exports.search = (req, res) => {

    const search = req.query.search;
    let matchProducts;

    let image;
    if(req.session.user) {

        user.findOne({
            where: {
                id: req.session.user.id
            }
        }).then(user => {
            image = user.image;
        });
    }
    product.findAll().then(function (products) {

        matchProducts = products.filter((product) => {
            return product.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });

        res.render('product/search', {
            products: matchProducts,
            cart: req.session.cart,
            hearts: req.session.heart,
            image: image
        });
    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    });

};

module.exports.filter = (req, res) => {

    let page = parseInt(req.query.page) || 1; // n
    let perPage = 9; // x

    let start = (page - 1) * perPage;
    let end = page * perPage;

    let promotion = parseInt(req.query.promotion, 10);
    let selected = parseInt(req.query.selected, 10);
    let category_id = parseInt(req.query.id, 10);
    let matchProduct;
    let image;

    if(req.session.user) {

        user.findOne({
            where: {
                id: req.session.user.id
            }
        }).then(user => {
            image = user.image;
        });
    }
    product.findAll({
        where: {
            category_id: category_id
        }
    }).then(function (products) {
        if(selected === 1) {
            if (promotion === 1) {
                matchProduct = products.filter((product) => {
                    return product.price < 500000 && product.sale !== 0;
                });
            } else {
                matchProduct = products.filter((product) => {
                    return product.price < 500000 && product.sale === 0;
                });
            }
        }
        else if(selected === 2) {
            if (promotion === 1) {
                matchProduct = products.filter((product) => {
                    return product.price >= 500000 && product.price <= 1000000 && product.price !== 0;
                });
            } else {
                matchProduct = products.filter((product) => {
                    return product.price >= 500000 && product.price <= 1000000 && product.price === 0;
                });
            }
        }
        else if(selected === 3) {
            if (promotion === 0) {
                matchProduct = products.filter((product) => {
                    return product.price > 1000000 && promotion !== 0;
                });
            } else {
                matchProduct = products.filter((product) => {
                    return product.price > 1000000 && promotion === 0;
                });
            }
        }

        res.render('product/filter', {
            products: matchProduct.slice(start, end),
            allProducts: matchProduct,
            cart: req.session.cart,
            hearts: req.session.heart,
            image: image,
            promotion: promotion,
            selected: selected,
            category_id: category_id
        });
    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    });
};