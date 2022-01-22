const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const {
    google: { clientId: clientID, clientSecret },
} = require('./keys');
const User = require('../models/User');

passport.serializeUser((user, done) => {
    console.log('Serializing user: ', user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('Deserializing user: ', id);
    User.findById(id)
        .then(user => {
            console.log('Deserialization result: ', user);
            done(null, user);
        })
        .catch(err => {
            console.log('Error: ', err.message);
        });
});

passport.use(
    new GoogleStrategy(
        {
            callbackURL: '/auth/google/redirect',
            clientID,
            clientSecret,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const result = await User.findOne({ googleId: profile.id });
                if (result) {
                    console.log('user is: ', result);
                    done(null, result);
                } else {
                    const newUser = await User.create({
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        imgUrl: profile.photos[0].value,
                        googleId: profile.id,
                    });
                    console.log('Created new user: ', newUser);
                    done(null, newUser);
                }
            } catch (err) {}
        }
    )
);
