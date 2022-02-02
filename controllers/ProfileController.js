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
                const fileName = DOMPurify.sanitize(file.name);
                const ext = path.extname(fileName || '').split('.');
                const ex = ext[ext.length - 1];
                const pathName = path.join(__dirname + `../../uploads/${id}.${ex}`);
                file.mv(pathName, err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(`/uploads/${id}.${ex}`);
                    }
                });
            } else {
                resolve(null);
            }
        });
    };

    try {
        const prevUser = await User.findOne({ username: req.body.name });
        if (prevUser && !prevUser.email === req.user.email) {
            //prettier-ignore
            throw new Error('Username isn\'t available');
        }
        const email = req.user.email;
        let fileUrl;
        if (req.files) {
            fileUrl = await uploadFile(req);
        }
        const updateObj = {
            ...(fileUrl && { imgUrl: fileUrl }),
            ...(req.body.name && { username: DOMPurify.sanitize(req.body.name) }),
            ...(req.body.about.length <= 40 &&
                req.body.about && { bio: DOMPurify.sanitize(req.body.about) }),
        };
        await User.findOneAndUpdate({ email: email }, updateObj, { upsert: true });
        res.redirect('/profile');
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/profile/edit');
    }
};

exports.view_profile = async (req, res, next) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username: username });
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
    if (req.user.googleId && !req.user.username) {
        try {
            await User.findOneAndUpdate(
                { email: req.user.email },
                { username: req.body.name },
                { upsert: true },
            );
            res.redirect(`/profile/${req.body.name}`);
        } catch (err) {
            req.flash('error', err.message);
            res.redirect('/profile/choose-username');
        }
    } else {
        next();
    }
};
