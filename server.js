//Server.js

// Load required packages
var express = require('express');

// Create our Express application
var app = express();

// Create our Express router
var router = express.Router();


/* Initial dummy route for testing*/
router.get('/', function(req, res) {
    res.end('Twit-Grits!');
}); // Do I want to put my routes in a seperate file?

// Register all our routes
app.use(router);

// Start the server
app.listen(3000);

console.log('server starting');