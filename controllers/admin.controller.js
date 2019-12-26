const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require('../src/database/connection');
const admin = require('../src/models/admin.model');
const user = require('../src/models/user.model');

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
    let admin = req.session.admin;
    res.render('admin/dashboard', {
        admin: admin
    });
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
    let admin = req.session.admin;
    res.render('admin/invoice', {
        admin: admin
    });
};

module.exports.product = (req, res) => {
    let admin = req.session.admin;
    res.render('admin/product', {
        admin: admin
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