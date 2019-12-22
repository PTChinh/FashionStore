const bcrypt = require('bcrypt');
const saltRounds = 10;
const express = require('express');
const app = express();

const db = require('../src/database/connection');
const user = require('../src/models/user.model');
const product = require('../src/models/product.model');
const productDetail = require('../src/models/productDetail.model');

module.exports.cart = (req, res) => {
    let us = req.session.user;
    let cart = req.session.cart;
    let products = [];

    if(cart) {
        for (let i = 0; i < cart.length; i++) {
            product.findOne({
                where: {
                    id: cart[i].product_id
                }
            }).then(function (product) {

                let isDup = false;

                for (let j = 0; j < products.length; j++) {
                    if (products[j].id === product.id)
                        isDup = true;
                }
                if (!isDup)
                    products.push(product);

                res.render('user/cart', {
                    user: us,
                    cart: cart,
                    products: products
                });

            }).catch(function (err) {
                console.log('Some thing went wrong! ' + err);
            })
        }
    }
    else {
        res.render('user/cart', {
            user: us,
            cart: cart,
        });
    }
};

module.exports.info = (req, res) => {
    let us = req.session.user;
    res.render('user/info', {
        user: us,
        cart: req.session.cart
    });
};

module.exports.changePassword = (req, res) => {
    const oldPass = req.body.oldPassword;
    const newPass = req.body.newPassword;

    user.findOne({
        where: {id: req.signedCookies.userId}
    }).then((us) => {
        if (us == null) {
            return res.status(401).send({
                msg: "Không tìm thấy tài khoản."
            });
        }
        let result = bcrypt.compareSync(oldPass, us.password);
        if (result === false) {
            return res.status(406).send({msg: "Mật khẩu cũ không đúng."});
        }
        let hash = bcrypt.hashSync(newPass, saltRounds);
        user.update(
            {
                password: hash,
                updated_at: Date.now()
            },
            {
                where: {
                    id: req.signedCookies.userId
                }
            });

        return res.status(200).send({msg: "Thay đổi mật khẩu thành công"});
    });
};

module.exports.postUserLogin = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    user.findOne({
        where: { username: username }
    }).then((user) => {
        if(user == null) {
            res.status(401).send({
               msg: "Không tìm thấy tài khoản."
            });
        }
        else {
            let result = bcrypt.compareSync(password, user.password);
            if(result === false) {
                res.status(406).send({msg: "Mật khẩu không đúng."});
            }
            else {

                res.cookie('userId', user.id, {
                    signed: true
                });
                res.status(200).send({msg: "Đăng nhập thành công."})
            }

        }
    });
};