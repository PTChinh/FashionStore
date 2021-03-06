const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require('../src/database/connection');
const admin = require('../src/models/admin.model');
const user = require('../src/models/user.model');
const transaction = require('../src/models/transaction.model');
const orders = require('../src/models/orders.model');
const product = require('../src/models/product.model');
const productDetail = require('../src/models/productDetail.model');

module.exports.login = (req, res) => {
    res.render('admin/login');
};

module.exports.postLogin = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    admin.findOne({
       where: { username: username }
    }).then((admin) => {
        if(admin == null) {
            res.render('admin/login', {
                errors: [
                    'Username does not exist.'
                ],
                values: req.body
            });
        }
        else {
            let result = bcrypt.compareSync(password, admin.password);
            if(result === false) {
                res.render('admin/login', {
                    errors: [
                        'Wrong password'
                    ],
                    values: req.body
                });
            }
            else {
                res.cookie('adminId', admin.id, {
                    signed: true
                });
                req.session.admin = admin;
                res.redirect('/admin/dashboard');
            }
        }
    });
};

async function countSomething() {
    let ads = await admin.count();
    let pros = await product.count();
    let us = await user.count();
    let inv = await transaction.count();

    return {
        ads: ads,
        pros: pros,
        us: us,
        inv: inv
    }
}

module.exports.dashBoard = (req, res) => {

    admin.count().then(function (a) {
        product.count().then(function (b) {
            user.count().then(function (c) {
                transaction.count().then(function (d) {
                    let ad = req.session.admin;
                    res.render('admin/dashboard', {
                        admin: ad,
                        ads: a,
                        pros: b,
                        us: c,
                        trans: d
                    });
                })
            })
        })
    })


};

module.exports.staff = (req, res) => {

    admin.findAll().then(function (staffs) {
        let admin = req.session.admin;
        res.render('admin/staff', {
            staffs: staffs,
            admin: admin
        });

    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    });
};

module.exports.user = (req, res) => {

    user.findAll().then(function (users) {
        let admin = req.session.admin;
        res.render('admin/user', {
            users: users,
            admin: admin
        });
    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    });
};

module.exports.invoice = (req, res) => {

    transaction.findAll().then(function (trans) {
        let admin = req.session.admin;
        res.render('admin/invoice', {
            trans: trans,
            admin: admin
        });
    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    });
};

module.exports.product = (req, res) => {

    product.findAll().then(function (pros) {
        let admin = req.session.admin;
        res.render('admin/product', {
            products: pros,
            admin: admin
        });
    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    });
};

module.exports.report = (req, res) => {
    let admin = req.session.admin;
    res.render('admin/report', {
        admin: admin
    });
};

module.exports.createStaff = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const role = req.body.role;
    let hash = bcrypt.hashSync(password, saltRounds);

    admin.create({
        username: username,
        password: hash,
        email: email,
        role: role,
        status: 1,
        created_at: Date.now(),
        updated_at: Date.now()
    }).then(function (admin) {
        if(admin) {
            res.status(200).send({msg: "Đăng kí thành công."});
        } else {
            res.status(500).send({msg: "Đăng kí không thành công."});
        }
    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    });
};

module.exports.updateStaff = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const role = req.body.role;
    const status = req.body.status;
    const id = req.body.id;

    admin.findOne({
        where: {
            id: id
        }
    }).then((ad) => {
        if (ad == null) {
            return res.status(401).send({
                msg: "Không tìm thấy tài khoản."
            });
        }
        admin.update(
            {
                username: username,
                email: email,
                role: role,
                status: status,
                updated_at: Date.now()
            }, {
                where: {
                    id: id
                }
            }
        );
        return res.status(200).send({msg: "Thay đổi thành công."});
    });
};

module.exports.createUser = (req, res) => {

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
    });
};

module.exports.updateUser = (req, res) => {
    const name = req.body.name;
    const dob = req.body.dob;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const sex = req.body.sex;
    const id = parseInt(req.body.id, 10);
    const status = parseInt(req.body.status,10);

    user.findOne({
        where: {
            id: id
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
                status: status,
                updated_at: Date.now()
            },
            {
                where: {
                    id: id
                }
            });
        return res.status(200).send({msg: "Thay đổi thành công."});
    });
};

module.exports.staffLogout = (req, res) => {
    res.clearCookie('adminId');
    delete req.session.admin;

    res.status(200).send({msg: "Đã đăng xuất"});
};

module.exports.staffChangePassword = (req, res) => {
    const oldPass = req.body.oldPassword;
    const newPass = req.body.newPassword;

    admin.findOne({
        where: {id: req.signedCookies.adminId}
    }).then((staff) => {
        if (staff == null) {
            return res.status(401).send({
                msg: "Không tìm thấy tài khoản."
            });
        }
        let result = bcrypt.compareSync(oldPass, staff.password);
        if (result === false) {
            return res.status(406).send({msg: "Mật khẩu cũ không đúng."});
        }
        let hash = bcrypt.hashSync(newPass, saltRounds);
        admin.update(
            {
                password: hash,
                updated_at: Date.now()
            },
            {
                where: {
                    id: req.signedCookies.adminId
                }
            });
        return res.status(200).send({msg: "Thay đổi mật khẩu thành công"});
    });
};

module.exports.confirmInvoice = (req, res) => {
    const id = req.body.id;
    const status = req.body.status;

    transaction.findOne({
        where: {
            id: id
        }
    }).then(function (tran) {
        if (tran == null) {
            return res.status(401).send({
                msg: "Không tìm thấy đơn hàng."
            });
        }

        transaction.update(
            {
                status: status,
                updated_at: Date.now()
            },
            {
                where: {
                    id: id
                }
            }
        );
        return res.status(200).send({msg: "Duyệt đơn hàng thành công"});
    });
};

module.exports.detailInvoice = (req, res) => {
    let trans_id = parseInt(req.query.id, 10);

    transaction.findOne({
        where: {
            id: trans_id
        }
    }).then(function (tran) {
        orders.findAll({
            where: {
                transaction_id: trans_id
            }
        }).then(function (orders) {
            let admin = req.session.admin;
            res.render('admin/detailInvoice', {
                orders: orders,
                admin: admin,
                tran: tran
            });

        }).catch(function (err) {
            console.log('Some thing went wrong! ' + err);
        });
    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    });
};

module.exports.removeProduct = (req, res) => {
    let id = req.body.product_id;

    product.findOne({
        where: {
            id: id
        }
    }).then(function (pro) {
        if (pro == null) {
            return res.status(401).send({
                msg: "Không tìm thấy sản phẩm."
            });
        }
        product.destroy({
            where: {
                id: id
            }
        });

        productDetail.destroy({
           where: {
               product_id: id
           }
        });

        return res.status(200).send({msg: "Xóa sản phẩm thành công"});
    });

};

module.exports.detailProduct = (req, res) => {
    let pro_id = parseInt(req.query.id, 10);

    product.findOne({
        where: {
            id: pro_id
        }
    }).then(function (pro) {
        productDetail.findAll({
            where: {
                product_id: pro_id
            }
        }).then(function (productDetails) {
            let admin = req.session.admin;
            res.render('admin/productDetail', {
                productDetails: productDetails,
                admin: admin,
                pro: pro
            });

        }).catch(function (err) {
            console.log('Some thing went wrong! ' + err);
        });
    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    });
};

module.exports.removeProductDetail = (req, res) => {
    let id = req.body.productDetailId;

    productDetail.findOne({
        where: {
            id: id
        }
    }).then(function (pro) {
        if (pro == null) {
            return res.status(401).send({
                msg: "Không tìm thấy sản phẩm."
            });
        }
        productDetail.destroy({
            where: {
                id: id
            }
        });

        return res.status(200).send({msg: "Xóa sản phẩm thành công"});
    });

};

module.exports.updateProduct = (req, res) => {

    const id = req.body.id;
    const name = req.body.name;
    const sup = req.body.sup;
    const cate = req.body.cate;
    const content = req.body.content;
    const price = req.body.price;
    const sale = req.body.sale;

    product.findOne({
        where: {
            id: id
        }
    }).then((pro) => {
        if (pro == null) {
            return res.status(401).send({
                msg: "Không tìm thấy sản phẩm."
            });
        }
        product.update(
            {
                name: name,
                supplier_id: sup,
                category_id: cate,
                content: content,
                price: price,
                sale: sale,
                updated_at: Date.now()
            },
            {
                where: {
                    id: id
                }
            });

        return res.status(200).send({msg: "Sửa sản phẩm thành công"});
    });

};

module.exports.updateProductDetail = (req, res) => {

    const id = req.body.productDetailId;
    const color = req.body.color;
    const size = req.body.size;
    const total = req.body.total;


    productDetail.findOne({
        where: {
            id: id
        }
    }).then((pro) => {
        if (pro == null) {
            return res.status(401).send({
                msg: "Không tìm thấy sản phẩm."
            });
        }
        productDetail.update(
            {
                color: color,
                size: size,
                total: total,
                updated_at: Date.now()
            },
            {
                where: {
                    id: id
                }
            });

        return res.status(200).send({msg: "Sửa sản phẩm thành công"});
    });

};

module.exports.createProduct = (req, res) => {

    let path = req.file.path;
    let repPath = path.replace(/\\/g, "/");
    let newPath = repPath.split('/').slice(1).join('/');

    let name = req.body.name;
    let sup = req.body.sup;
    let cate = req.body.cate;
    let content = req.body.content;
    let price = req.body.price;
    let sale = req.body.sale;

    product.create({
        name: name,
        supplier_id: sup,
        category_id: cate,
        content: content,
        price: price,
        sale: sale,
        image: newPath,
        created_at: Date.now(),
        updated_at: Date.now()
    }).then(function (pro) {
        if(pro) {
            productDetail.create({
                product_id: pro.id,
                image: pro.image,
                total: 0,
                buyed: 0,
                created_at: Date.now(),
                updated_at: Date.now()
            }).then(function (rs) {
                res.redirect('/admin/product');
            }).catch(function (err) {
                console.log('Some thing went wrong! ' + err);
            });
        } else {
            res.status(500).send({msg: "Tạo không thành công."});
        }
    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    });
};

module.exports.createProductDetail = (req, res) => {

    let path = req.file.path;
    let repPath = path.replace(/\\/g, "/");
    let newPath = repPath.split('/').slice(1).join('/');

    let product_id = req.body.productId;
    let color = req.body.color;
    let size = req.body.size;
    let total = req.body.total;

    productDetail.create({
        product_id: product_id,
        color: color,
        size: size,
        total: total,
        buyed: 0,
        image: newPath,
        created_at: Date.now(),
        updated_at: Date.now()
    }).then(function (pro) {
        if(pro) {
            res.redirect('/admin/product/detail?id=' + product_id);
        } else {
            res.status(500).send({msg: "Tạo không thành công."});
        }
    }).catch(function (err) {
        console.log('Some thing went wrong! ' + err);
    });
};


