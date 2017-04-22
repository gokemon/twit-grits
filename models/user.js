/* Load required packages  */
var mongoose = require('mongoose');
var crypto = require('crypto');
var secrets = require('../config/secrets');
// see notes at bottom



/* Define our user schema  */
var UserSchema = new mongoose.Schema({
    twitterId: { type: String, unique: true, required: true },
    username: { type: String, unique: true, lowercase: true, required: true },
    email: { type: String, lowercase: true },
    name: { type: String, default: '' },
    created: { type: Date, default: new Date() },
    accessToken: { type: String, required: true },
    tokenSecret: { type: String, required: true }
});


/* seems pretty obvious that we encrypt here */
UserSchema.methods.encrypt = function(text) {
    var algorithm = secrets.cryptos.algorithm;
    var key = secrets.cryptos.key;
    var cipher = crypto.createCipher(algorithm, key);
    return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
};

/* seems pretty obvious that we decrypt here */
UserSchema.methods.decrypt = function(text) {
    var algorithm = secrets.cryptos.algorithm;
    var key = secrets.cryptos.key;
    var decipher = crypto.createDecipher(algorithm, key);
    return decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
};





/* Export the Mongoose model, we always do this */
module.exports = mongoose.model('User', UserSchema);


/* So what is going on here?
We loaded the Mongoose package
Created a Mongoose schema which maps to a MongoDB collection and defines the shape of the documents within that collection.
We defined our schema to contain twitterId, username, email, name, created date, access token, and token secret.
We exported the Mongoose user model for use within our application.
We created two methods on our schema that we will use to encrypt and decrypt the access token and token secret.
*/