const bcrypt = require('bcrypt');
const saltRounds = 10;
const Sequelize = require('sequelize');
const multer = require('multer');
const upload = multer({dest: './public/images/user/'});

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

    let image;
    user.findOne({
        where: {
            id: us.id
        }
    }).then(user => {
        image = user.image;
    });

    if(cart) {
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
                products: products,
                image: image
            });
        }).catch((err) => {
            console.log('Some thing went wrong! ' + err);
        })

    } else {
        res.render('user/cart', {
            user: us,
            cart: cart,
            image: image
        });
    }
};

module.exports.info = (req, res) => {
    let us = req.session.user;
    let image;
    user.findOne({
        where: {
            id: us.id
        }
    }).then(user => {
        image = user.image;
        res.render('user/info', {
            user: us,
            cart: req.session.cart,
            image: image
        });
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
                req.session.user = user;
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

    let totalFinal = parseInt(req.body.totalMoney,10);

    let user = req.session.user;

    let transportFee = 20000;

    totalFinal += transportFee;

    for(let i = 0; i < listProductDetails.length; i++) {
        productDetail.findOne({
            where: {
                id: listProductDetails[i]
            }
        }).then(function (pro) {
            if(pro) {
                if(pro.total - pro.buyed < listProductQuantity[i]) {
                    return res.status(500).send({msg: "Sản phẩm " + listProductNames[i] + " không đủ số lượng bạn mua."});
                }
            }
        })
    }

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
                          productDetail.increment(
                              {
                                  total: - listProductQuantity[i],
                                  buyed: listProductQuantity[i]
                              }, {
                                  where: {
                                      id: pd.id
                                  }
                              }
                          );
                          console.log("thanh cong");
                      } else {
                          console.log("that bai");
                      }
                  });
              });
          }
          req.session.cart = [];
          res.status(200).send({msg: "Đặt hàng thành công."});
      } else {
          res.status(500).send({msg: "Có lỗi xảy ra. Vui lòng thực hiện lại thao tác."});
      }
  });
};

module.exports.orderInfo = (req, res) => {
  let us = req.session.user;
  let listTrans, listOrders = [], promises = [];

    let image;
    user.findOne({
        where: {
            id: req.session.user.id
        }
    }).then(user => {
        image = user.image;
    });

  transaction.findAll({
      where: {
          user_id: us.id
      }
  }).then(function (allTrans) {
      listTrans = allTrans;

      for(let i = 0; i < listTrans.length; i++) {
          promises.push(
              orders.findAll({
                  where: {
                      transaction_id: listTrans[i].id
                  }
              }).then(function (orders) {
                  listOrders.push({
                      transId: listTrans[i].id,
                      orders: orders
                  });
              })
          )
      }

      Promise.all(promises).then(() => {
          res.render('user/order', {
              user: us,
              cart: req.session.cart,
              listTrans: listTrans,
              listOrders: listOrders,
              image: image
          });
      }).catch((err) => {
          console.log('Some thing went wrong! ' + err);
      });

  }).catch(function (err) {
      console.log('Some thing went wrong! ' + err);
  });

};

module.exports.interested = (req, res) => {
    let heart = req.session.heart;
    let listProducts = [], promises = [];
    let image;
    user.findOne({
        where: {
            id: req.session.user.id
        }
    }).then(user => {
        image = user.image;
    });

    if(heart) {
        for (let i = 0; i < heart.length; i++) {
            promises.push(
                productDetail.findAll({
                    where: {
                        product_id: heart[i].id
                    }
                }).then(function (products) {
                    listProducts.push({
                        product_id: heart[i].id,
                        productDetails: products
                    });
                })
            )
        }

        Promise.all(promises).then(() => {
            res.render('user/interested', {
                user: req.session.user,
                cart: req.session.cart,
                listProducts: req.session.heart,
                listProductDetails: listProducts,
                image: image
            });
        }).catch((err) => {
            console.log('Some thing went wrong! ' + err);
        });
    } else {
        res.render('user/interested', {
            user: req.session.user,
            cart: req.session.cart,
            image: image
        });
    }
};

module.exports.addToInterested = (req, res) => {
    let id = req.body.productId;

    product.findOne({
        where: {
            id: id
        }
    }).then(function (product) {
        if(product) {

            if (req.session.heart) {
                req.session.heart.push(product);
            } else {
                req.session.heart = [product];
            }

            res.status(200).send({ msg: "Thêm sản phẩm thành công." });
        } else {
            res.status(401).send({ msg: "Không tìm thấy sản phẩm" });
        }
    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    });
};

module.exports.removeFromInterested = (req, res) => {
    let id = req.body.productId;

    product.findOne({
        where: {
            id: id
        }
    }).then(function (product) {
        if(product) {
            let heart = req.session.heart;
            for(let i = 0; i < heart.length; i++) {
                if(product.id === heart[i].id)
                    req.session.heart.splice(i, 1);
            }
            res.status(200).send({ msg: "Xóa thành công." });
        } else {
            res.status(401).send({ msg: "Không tìm thấy sản phẩm" });
        }
    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    });
};

module.exports.changeInfo = (req, res) => {
    const name = req.body.name;
    const dob = req.body.dob;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const sex = req.body.sex;

    user.findOne({
        where: {
            id: req.signedCookies.userId
        }
    }).then((us) => {
        if (us == null) {
            return res.status(401).send({
                msg: "Không tìm thấy tài khoản."
            });
        }
        user.update(
            {
                name: name,
                dob: dob,
                email: email,
                phone: phone,
                sex: sex,
                address: address,
                updated_at: Date.now()
            },
            {
                where: {
                    id: req.signedCookies.userId
                }
            });

        return res.status(200).send({msg: "Thay đổi thành công."});
    });
};

module.exports.uploadAvt = (req, res) => {

    let path = req.file.path;
    let repPath = path.replace(/\\/g, "/");
    let newPath = repPath.split('/').slice(1).join('/');

    user.findOne({
        where: {
            id: req.signedCookies.userId
        }
    }).then((us) => {
        if (us == null) {
            return res.status(401).send({
                msg: "Không tìm thấy tài khoản."
            });
        }
        user.update(
            {
                image: newPath
            },
            {
                where: {
                    id: req.signedCookies.userId
                }
            });
    });

    let image = newPath;
    console.log(image);
    res.render('user/info', {
        user: req.session.user,
        cart: req.session.cart,
        image: image
    });
};

module.exports.logOut = (req, res) => {
    res.clearCookie('userId');
    req.session.destroy();

    res.status(200).send({msg: "Đã đăng xuất"});
};

module.exports.signUp = (req, res) => {
    const username = req.body.username;
    const address = req.body.address;
    const email = req.body.email;
    const phone = req.body.phone;
    const dob = req.body.dob;
    const sex = req.body.sex;
    const name = req.body.name;
    const pass = req.body.pass;
    let hash = bcrypt.hashSync(pass, saltRounds);

    user.create({
        name: name,
        username: username,
        image: 'images/user/default.png',
        sex: sex,
        password: hash,
        email: email,
        phone: phone,
        dob: dob,
        address: address,
        status: 1,
        created_at: Date.now(),
        updated_at: Date.now()
    }).then(function (us) {
        if(us) {
            res.status(200).send({msg: "Đăng kí thành công."});
        } else {
            res.status(500).send({msg: "Đăng kí không thành công."});
        }
    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    })


};