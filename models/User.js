const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        match: /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
    },
    email: {
        type: String,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true,
        trim: true,
    },
    imgUrl: {
        type: String,
        default: '/uploads/default.png',
    },
    googleId: {
        type: String,
    },
    password: {
        type: String,
    },
    bio: {
        type: String,
        trim: true,
    },
    verified: {
        type: Boolean,
    },
    verificationToken: {
        type: String,
    },
    tokenExpire: {
        type: Date,
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
