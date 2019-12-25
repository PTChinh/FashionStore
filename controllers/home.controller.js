
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

module.exports.transport = (req, res) => {

    let us =  req.session.user;
    let image;
    if(us) {
        user.findOne({
            where: {
                id: us.id
            }
        }).then(user => {
            image = user.image;
            res.render('home/transport', {
                cart: req.session.cart,
                user: req.session.user,
                image: image
            });
        });
    } else {
        res.render('home/transport', {
            cart: req.session.cart,
            user: req.session.user,
        });
    }

};

module.exports.about = (req, res) => {

    let us =  req.session.user;
    let image;
    if(us) {
        user.findOne({
            where: {
                id: us.id
            }
        }).then(user => {
            image = user.image;
            res.render('home/about', {
                cart: req.session.cart,
                user: req.session.user,
                image: image
            });
        });
    } else {
        res.render('home/about', {
            cart: req.session.cart,
            user: req.session.user,
        });
    }
};

module.exports.buytips = (req, res) => {

    let us =  req.session.user;
    let image;
    if(us) {
        user.findOne({
            where: {
                id: us.id
            }
        }).then(user => {
            image = user.image;
            res.render('home/buytips', {
                cart: req.session.cart,
                user: req.session.user,
                image: image
            });
        });
    } else {
        res.render('home/buytips', {
            cart: req.session.cart,
            user: req.session.user,
        });
    }
};