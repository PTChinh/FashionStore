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
require('./src/database/connection');

sequelize.authenticate().then(() => console.log('Database connected...')).catch(err => console.log('Error: ' + err));

//Routes
app.get('/', (req, res) => res.render('index'));

app.use('/admin', adminRoute);
app.use('/user', userRoute);

app.listen(port, () => console.log('Server listening on port ' + port));