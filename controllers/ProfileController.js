/* eslint-disable no-undef */
const User = require('../models/User');
const path = require('path');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

exports.update_profile = async (req, res) => {
    const uploadFile = req => {
        return new Promise((resolve, reject) => {
            if (req.files.file.mimetype.includes('image') && req.files.file.size <= 204800) {
                const id = req.user.id.toString();
                const file = req.files.file;
                const pathName = path.join(__dirname + `../../uploads/${id}`);
                file.mv(pathName, err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(`/uploads/${id}`);
                    }
                });
            } else {
                resolve(null);
            }
        });
    };

    try {
        const username = req.body.name;
        const email = req.user.email;
        const bio = req.body.about;
        if (!/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(username))
            throw new Error('Username should contain only alphanumeric characters');
        const prevUser = await User.findOne({
            username: { $regex: new RegExp(`^${username}$`), $options: 'i' },
        });
        if (prevUser && prevUser.id !== req.user.id) {
            //prettier-ignore
            throw new Error('Username already exists');
        }
        let fileUrl;
        if (req.files) {
            fileUrl = await uploadFile(req);
        }
        const updateObj = {
            ...(fileUrl && { imgUrl: fileUrl }),
            ...(username && { username: DOMPurify.sanitize(username) }),
            ...(bio.length <= 40 && bio && { bio: DOMPurify.sanitize(bio) }),
        };
        await User.findOneAndUpdate({ email }, updateObj, { upsert: true });
        res.redirect('/profile');
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/profile/edit');
    }
};

exports.view_profile = async (req, res, next) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({
            username: { $regex: new RegExp(`^${username}$`), $options: 'i' },
        });
        if (user) {
            res.render('profile', { guestProfile: user, user: req.user });
        } else {
            next();
        }
    } catch (err) {
        res.send(err.message);
    }
};

exports.choose_username = async (req, res, next) => {
    try {
        const username = req.body.name;
        if (!/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(username))
            throw new Error('Username should contain only alphanumeric characters');
        const prevUser = await User.findOne({
            username: { $regex: new RegExp(`^${username}$`), $options: 'i' },
        });
        if (prevUser) {
            throw new Error('Username already exists');
        }
        // Update user details
        if (req.user.googleId && !req.user.username) {
            await User.findOneAndUpdate(
                { email: req.user.email },
                { username: username },
                { upsert: true },
            );
            res.redirect(`/profile/${username}`);
        } else {
            next();
        }
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/profile/choose-username');
    }
};
