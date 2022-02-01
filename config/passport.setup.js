const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local').Strategy;
const {
    google: { clientId: clientID, clientSecret },
} = require('./keys');
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        })
        .catch(err => {
            done(err.message);
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
                    done(null, result);
                } else {
                    const newUser = await User.create({
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        imgUrl: profile.photos[0].value,
                        googleId: profile.id,
                    });
                    done(null, newUser);
                }
            } catch (err) {
                done(err.message);
            }
        },
    ),
);

passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                return done(null, false, { message: 'Email or Password is incorrect' });
            }
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Email or Password is incorrect' });
            }
        } catch (err) {
            done(err.message);
        }
    }),
);
