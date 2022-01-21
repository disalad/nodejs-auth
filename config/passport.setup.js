const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const {
    google: { clientId, clientSecret },
} = require('./keys');

passport.use(
    new GoogleStrategy(
        {
            callbackURL: '/auth/google/redirect',
            clientId,
            clientSecret,
        },
        () => {}
    )
);
