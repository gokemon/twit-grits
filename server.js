/* Server.js */
/* Load required packages  */
var express = require('express');
var compression = require('compression');
/* path added so we can move the routes 
 * out from server to the controller */
var path = require('path');

/* Load controllers */
var homeController = require('./controllers/home');
/* homeController created so we can move the  
 * routes out from server to the controller */

/* Create our Express application */
var app = express();

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

/* Register all our routes */
app.use(router);



/* Start the server */
app.listen(3000);

console.log('Twit Server Starting');