const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local').Strategy;
const {
    google: { clientId: clientID, clientSecret },
} = require('./keys');
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
    console.log('Serializing user: ', user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('Deserializing user: ', id);
    User.findById(id)
        .then(user => {
            console.log('Deserialized user: ', user.username);
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
            } catch (err) {
                done(err.message);
            }
        }
    )
);

passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                console.log('User doesn\'t exist', user);
                return done(null, false, { message: 'Email or Password is incorrect' });
            }
            if (await bcrypt.compare(password, user.password)) {
                console.log('Password Correct');
                return done(null, user);
            } else {
                return done(null, false, { message: 'Email or Password is incorrect' });
            }
        } catch (err) {
            console.log('Err: ', err.message);
            done(err.message);
        }
    })
);
