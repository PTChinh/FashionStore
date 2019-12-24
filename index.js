require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//Middleware
const adminMiddleware = require('./middleware/admin.middleware');
const userMiddleware = require('./middleware/user.middleware');

//Route
const adminRoute = require('./routes/admin.route');
const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const homeRoute = require('./routes/home.route');

const port = 1999;

const app = express();

app.locals.moment = require('moment');

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
// productDetail.create({
//     product_id: 29,
//     image: 'images/products/shoe/shoes/giay-nam-y2010-bd-a42/2.jpg',
//     color: 'trắng đỏ',
//     size: '39',
//     total: 20,
//     buyed: 0,
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

app.use('/', userMiddleware.requireAuthUser, homeRoute);
app.use('/product', userMiddleware.requireAuthUser, productRoute);
app.use('/admin', adminRoute);
app.use('/user', userRoute);

app.listen(port, () => console.log('Server listening on port ' + port));