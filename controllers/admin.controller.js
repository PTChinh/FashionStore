const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require('../src/database/connection');
const admin = require('../src/models/admin.model');

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

module.exports.dashBoard = (req, res) => {
    res.render('admin/dashboard');
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
    res.render('admin/user');
};

module.exports.invoice = (req, res) => {
    res.render('admin/invoice');
};

module.exports.product = (req, res) => {
    res.render('admin/product');
};

module.exports.report = (req, res) => {
    res.render('admin/report');
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