const bcrypt = require('bcrypt');
const saltRounds = 10;
const express = require('express');
const app = express();

const db = require('../src/database/connection');
const user = require('../src/models/user.model');
const product = require('../src/models/product.model');
const productDetail = require('../src/models/productDetail.model');
const orders = require('../src/models/orders.model');
const transaction = require('../src/models/transaction.model');

module.exports.cart = (req, res) => {
    let us = req.session.user;
    let cart = req.session.cart;
    let products = [];
    let promises = [];

    if(cart.length !== 0) {
        for (let i = 0; i < cart.length; i++) {
            promises.push(
                product.findOne({
                    where: {
                        id: cart[i].product_id
                    }
                }).then(function (product) {
                    let isDup = false;
                    if (products.length !== 0) {
                        for (let j = 0; j < products.length; j++) {
                            if (products[j].id === product.id)
                                isDup = true;
                        }
                        if (!isDup)
                            products.push(product);
                    } else {
                        products.push(product);
                    }
                })
            )
        }
        Promise.all(promises).then(() => {
            res.render('user/cart', {
                user: us,
                cart: cart,
                products: products
            });
        }).catch((err) => {
            console.log('Some thing went wrong! ' + err);
        })

    } else {
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

module.exports.removeFromCart = (req, res) => {
    let id = req.body.productDetailId;

    productDetail.findOne({
        where: {
            id: id
        }
    }).then(function (productItem) {
        if(productItem) {
            let cart = req.session.cart;
            for(let i = 0; i < cart.length; i++) {
                if(productItem.id === cart[i].id) {
                    req.session.cart.splice(i, 1);
                }
            }
            res.status(200).send({msg: "Xóa thành công"});
        } else {
            res.status(401).send({msg: "Không tìm thấy sản phẩm"})
        }
    });
};

module.exports.order = (req, res) => {
    let listProductDetails = req.body.productDetails;

    let listTotalMoney = req.body.listTotalMoney;

    let listProductNames = req.body.listProductNames;

    let listProductPrice = req.body.listProductPrice;

    let listProductQuantity = req.body.listProductQuantity;

    let totalFinal = req.body.totalMoney;

    let user = req.session.user;

  transaction.create({
      status: 0,
      user_id: user.id,
      name: user.name,
      address: user.address,
      email: user.email,
      phone: user.phone,
      amount: totalFinal,
      payment: 'Tiền mặt',
      transport: 'Cửa Hàng',
      created_at: Date.now(),
      updated_at: Date.now()
  }).then(function (result) {
      if(result) {

          for(let i = 0; i < listProductDetails.length; i++) {

              productDetail.findOne({
                  where: {
                      id: listProductDetails[i]
                  }
              }).then(function (pd) {
                  orders.create({
                      transaction_id: result.id,
                      product_id: pd.product_id,
                      product_detail_id: pd.id,
                      total_product: listProductQuantity[i],
                      product_name: listProductNames[i],
                      price: listProductPrice[i],
                      amount: listTotalMoney[i],
                      created_at: Date.now(),
                      updated_at: Date.now()
                  }).then(function (result) {
                      if(result) {
                          console.log("thanh cong");
                      } else {
                          console.log("that bai");
                      }
                  });
              });
          }

          res.status(200).send({msg: "Đặt hàng thành công."});
      } else {
          res.status(500).send({msg: "Có lỗi xảy ra. Vui lòng thực hiện lại thao tác."});
      }
  });
};