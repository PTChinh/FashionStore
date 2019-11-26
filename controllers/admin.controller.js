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
                res.redirect('/admin/dashboard');
            }
        }
    });
};

module.exports.dashBoard = (req, res) => {
    res.render('admin/dashboard');
};