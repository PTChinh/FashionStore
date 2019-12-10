require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//Route
const adminRoute = require('./routes/admin.route');
const userRoute = require('./routes/user.route');

//Middleware
const adminMiddleware = require('./middleware/admin.middleware');

const port = 1999;

const app = express();

//Template Engine
app.set('view engine', 'pug');
app.set('views', './views');

//BodyParser and CookieParser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static(__dirname + '/public'));

//DB Connection
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('./src/database/connection');
const user = require('./src/models/user.model');
// const user = require('./src/models/user.model');
// var hash = bcrypt.hashSync('huy123', saltRounds);
// var day = new Date(1999,4,15);
// user.create({
//     id: 1,
//     name: 'Trần Hiệp Nguyên Huy',
//     username: 'tranhiepnguyenhuy',
//     password: hash,
//     email: 'tranhiepnguyenhuy1999@gmail.com',
//     phone: '0915330370',
//     dob: day,
//     address: 'Khóm 1, TT Mỹ An, Tháp Mười, Đồng Tháp',
//     status: 1,
//     createdAt: Date.now(),
//     updatedAt: Date.now()
// }).then(function (users) {
//     if(users) {
//         console.log("thanh cong");
//     }
//     else {
//         console.log("that bai");
//     }
// });

sequelize.authenticate().then(() => console.log('Database connected...')).catch(err => console.log('Error: ' + err));

//Middleware
const userMiddleware = require('./middleware/user.middleware');

//Routes
app.get('/', userMiddleware.requireAuthUser, (req, res) => res.render('index'));
app.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    user.findOne({
        where: { username: username }
    }).then((user) => {
        if(user == null) {
            res.sendStatus(401);
        }
        else {
            let result = bcrypt.compareSync(password, user.password);
            if(result === false) {
                res.send('Wrong password');
            }
            else {
                res.cookie('userId', user.id, {
                    signed: true
                });
                app.locals.user = user;
                res.redirect('/');
            }
        }
    });
});


app.use('/admin', adminRoute);
app.use('/user', userRoute);

app.listen(port, () => console.log('Server listening on port ' + port));