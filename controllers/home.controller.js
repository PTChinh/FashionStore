

module.exports.home = (req, res) => {
    res.render('home/index', {
        cart: req.session.cart,
        user: req.session.user,
    });
};