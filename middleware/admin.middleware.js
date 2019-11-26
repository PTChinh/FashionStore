const db = require('../src/database/connection');
const admin = require('../src/models/admin.model');

module.exports.requireAuthAdmin = (req, res, next) => {
    if(!req.signedCookies.adminId) {
        res.redirect('/admin/login');
        return;
    }

    admin.findOne({
        where: { id: req.signedCookies.adminId}
    }).then((admin) => {
        if(!admin) {
            res.redirect('/admin/login');
        }
        else {
            res.locals.admin = admin;
        }
    });

    next();
};