require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')

//Route
const adminRoute = require('./routes/admin.route');
const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');

//Middleware
const adminMiddleware = require('./middleware/admin.middleware');
const userMiddleware = require('./middleware/user.middleware');

const port = 1999;

const app = express();

//Template Engine
app.set('view engine', 'pug');
app.set('views', './views');

//BodyParser and CookieParser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(session({secret: '1231231dsdsdsfsf', cookie: { maxAge: 43200000}}));

app.use(express.static(__dirname + '/public'));

//DB Connection
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('./src/database/connection');
const user = require('./src/models/user.model');
const product = require('./src/models/product.model');
const productDetail = require('./src/models/productDetail.model');

var hash = bcrypt.hashSync('huy123', saltRounds);
var day = new Date(1999,4,15);
// product.create({
//     supplier_id: 5,
//     category_id: 4,
//     name: 'Ví Nam Y2010 A04',
//     image: 'images/products/accessories/wallets/vi-nam-y2010-a04/1.jpg',
//     content: 'Ví Nam Thời Trang Y2010',
//     price: 125000,
//     sale: 5,
//     created_at: Date.now(),
//     updated_at: Date.now()
// }).then(function (pro) {
//     if(pro) {
//         console.log("thanh cong");
//     }
//     else {
//         console.log("that bai");
//     }
// });

sequelize.authenticate().then(() => console.log('Database connected...')).catch(err => console.log('Error: ' + err));

//Routes
app.get('/', userMiddleware.requireAuthUser, (req, res) => {
    if(res.locals && res.locals.user)
        res.render('index', {user:  res.locals.user});
    else
        res.render('index');
});
// app.post('/', (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//
//     user.findOne({
//         where: { username: username }
//     }).then((user) => {
//         if(user == null) {
//             res.status(401).send({
//                 msg: "Không tìm thấy tài khoản."
//             });
//         }
//         else {
//             let result = bcrypt.compareSync(password, user.password);
//             if(result === false) {
//                 res.status(406).send({msg: "Mật khẩu không tào lao."});
//             }
//             else {
//                 res.cookie('userId', user.id, {
//                     signed: true
//                 });
//                 app.locals.user = user;
//                 res.redirect('/');
//             }
//         }
//     });
// });

app.use('/product', userMiddleware.requireAuthUser, productRoute);
app.use('/admin', adminRoute);
app.use('/user', userMiddleware.requireAuthUser, userRoute);

app.listen(port, () => console.log('Server listening on port ' + port));