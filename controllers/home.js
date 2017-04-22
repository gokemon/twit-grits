/* Home.js controller */


// Landing page route
exports.index = function(req, res) {
    res.locals.ip = req.ip;
    res.render('home');
};