const db = require('../src/database/connection');
const user = require('../src/models/user.model');

module.exports.requireAuthUser = (req, res, next) => {

    if(!req.signedCookies.userId) {
        res.locals.modal = {
            dataToggle: 'modal',
            dataTarget: '#mymodal'
        };
    }
    else {
        user.findOne({
            where: {id: req.signedCookies.userId}
        }).then((user) => {
            if (!user) {
                res.locals.modal = {
                    dataToggle: 'modal',
                    dataTarget: '#mymodal'
                };
            } else {
                res.locals.user = user;
            }
        });
    }

    next();
};