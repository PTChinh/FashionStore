
const user = require('../src/models/user.model');

module.exports.home = (req, res) => {
    let us =  req.session.user;
    let image;
    if(us) {
        user.findOne({
            where: {
                id: us.id
            }
        }).then(user => {
            image = user.image;
            res.render('home/index', {
                cart: req.session.cart,
                user: req.session.user,
                image: image
            });
        });
    } else {
        res.render('home/index', {
            cart: req.session.cart,
            user: req.session.user,
        });
    }

};