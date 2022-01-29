const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true,
    },
    imgUrl: {
        type: String,
        default:
            'https://res.cloudinary.com/df1unjmwz/image/upload/v1643474537/610-6104451_image-placeholder-png-user-profile-placeholder-image-png-removebg-preview_st4hdf.png',
    },
    googleId: {
        type: String,
    },
    password: {
        type: String,
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
