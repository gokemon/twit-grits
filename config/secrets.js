module.exports = {
    db: process.env.MONGODB || 'mongodb://localhost:27017/twitatron',

    cryptos: {
        algorithm: 'aes256',
        key: process.env.CRYPTO_KEY || 'Your crypto key goes here'
    },

    sessionSecret: process.env.SESSION_SECRET || 'Your session secret goes here',

    twitter: {
        consumerKey: process.env.TWITTER_KEY || ' DGxsx8GaiEMLlnlvbTCJCfbmt',
        consumerSecret: process.env.TWITTER_SECRET || ' lZ9C3hpUzqEhqJOmZk3iM723BeE6Ya8tvyulbWmSaGizJWrKZM',
        callbackURL: process.env.TWITTER_CALLBACK || 'http://localhost:3000/auth/twitter/callback',
        passReqToCallback: true
    }
};