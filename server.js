/* Server.js */
/* Load required packages  */
var express = require('express'); // its an express app after-all
var compression = require('compression'); //compression added
/* path added so we can move the routes 
 * out from server to the controller */
var path = require('path');
var secrets = require('./config/secrets');
var mongoose = require('mongoose'); // duh talk to the db
var passport = require('passport');
var session = require('express-session'); // sessions for the passport auth


// Connect to the twitatron MongoDB
mongoose.connect(secrets.db); // I guess thats the db name?

/* Load controllers */
var homeController = require('./controllers/home');
/* homeController created so we can move the  
 * routes out from server to the controller */
var authController = require('./controllers/auth');


/* Create our Express application */
var app = express();

// Tell Express to use sessions
app.use(session({
    secret: secrets.sessionSecret,
    resave: false,
    saveUninitialized: false,
}));

// Use the passport package in our application
app.use(passport.initialize());
app.use(passport.session());


/* Add content compression middleware */
app.use(compression());

/* Add static middleware */
var oneDay = 86400000;
// app.use(express.static(__dirname + '/public', { maxAge: oneDay }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneDay }));

/* Add pug view engine */
// app.set('views', __dirname + '/views');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');




/* Create our Express router */
var router = express.Router();

/* Landing page route*/
router.get('/', homeController.index);
// router.get('/', function(req, res) {
//     // res.end('Twit-Grits!');
//     res.locals.ip = req.ip;
//     /*  add the IP address of the client making 
//      * the request, to the  res.locals.ip  object
//      * which makes it available to our views */
//     res.render('home');
// }); // Do I want to put my routes in a seperate file?
/* Auth routes */
router.get('/auth/twitter', authController.twitter);
router.get('/auth/twitter/callback', authController.twitterCallback, function(req, res) {
    res.redirect(req.session.returnTo || '/');
});



/* Register all our routes */
app.use(router);



/* Start the server */
app.listen(3000);

console.log('Twit Server Starting');