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
                updatedAt: Date.now()
            },
            {
                where: {
                    id: req.signedCookies.userId
                }
            });

        return res.status(200).send({msg: "Thay đổi mật khẩu thành công"});
    });
};