const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require('../src/database/connection');
const user = require('../src/models/user.model');

module.exports.cart = (req, res) => {
    res.render('user/cart');
};

module.exports.info = (req, res) => {
    res.render('user/info');
};

module.exports.changePassword = (req, res) => {
    const oldPass = req.body.oldPassword;
    const newPass = req.body.newPassword;

    user.findOne({
        where: { id: req.signedCookies.userId }
    }).then((us) => {
        if(us== null) {
            res.sendStatus(401);
        }
        else {
            let result = bcrypt.compareSync(oldPass, us.password);
            if(result === false) {
                res.status(406).send('Mật khẩu cũ không đúng!');
            }
            else {
                let hash = bcrypt.hashSync(newPass, saltRounds);
                user.update(
                {
                    password: hash,
                    updatedAt: Date.now()
                },
                {
                    where: {
                        id: req.signedCookies.userId
                    }
                });

                res.redirect('/');
            }
        }
    });
};