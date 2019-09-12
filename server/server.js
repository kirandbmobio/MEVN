//import packages
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const mailer = require('express-mailer');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const userRoutes = require('./Routes/user.routes');
const postRoutes = require('./Routes/post.routes');
const indexRoutes = require('./Routes/index.routes');
const helperFunction = require('./module/helperEngine');
const productRouter = require('./Routes/product.routes.js');

//mongo connection
const url = "mongodb://localhost:27017/vodafone";
mongoose.connect(url, {
    useNewUrlParser: true
});
let db = mongoose.connection;
db.on('error', function(err) {
    console.error("connection error;", err);
});

app.use(cookieParser());

//create session
app.use(session({
    secret: "Shh, its a secret!",
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

//for display message
app.use(flash());

//set static path
app.use(express.static('public'));

//for sending mail
mailer.extend(app, {
    from: 'vodafone app<vodafone@gmail.com>',
    host: 'smtp.gmail.com',
    secureConnection: true,
    port: 465,
    transportMethod: 'SMTP',
    auth: {
        user: 'kirandb9210@gmail.com',
        pass: 'kdbolaniya'
    }
});

//template for design
const hbs = handlebars.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/mainlayouts'),
    partialsDir: path.join(__dirname, 'views/pieces'),
    extname: '.hbs',
    //create custom helpers 
    helpers: helperFunction
})
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

//for request and response data in json and urlencoded format 
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

//for cross origin with front-end framework and ajax call
app.use(cors());

//routers
app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/product', productRouter);

// app.get('/email', function (req, res, next) {
//     app.mailer.send('email', {
//         to: 'kiranb.mobio@gmail.com',
//         subject: 'hey kd',
//         otherProperty: 'Other property'
//     }, function (err) {
//         if (err) {
//             console.log(err);
//             res.send('There was an error sending the email');
//             return
//         }
//         res.send('Email Sent');
//     })
// })

//listening server
app.listen(8000, () => {
    console.log('server is starting at ', 8000);
})