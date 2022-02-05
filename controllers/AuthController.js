const User = require('../models/User');
const bcrypt = require('bcrypt');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const crypto = require('crypto');
const moment = require('moment');
const sendEmail = require('../utils/sendEmail');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

exports.delete_acc = async (req, res, next) => {
    try {
        await User.findOneAndRemove({ email: req.user.email });
        req.logout();
        next();
    } catch (err) {
        res.send(err.message);
    }
};

exports.register_user = async (req, res, next) => {
    try {
        const username = DOMPurify.sanitize(req.body.name);
        const email = DOMPurify.sanitize(req.body.email);
        const password = req.body.password;
        if (!username || !email || !password) throw new Error('Missing credentials');
        const hash = await bcrypt.hash(password, 10);
        const prevUser = await User.findOne({ email: email });
        const prevUsername = await User.findOne({
            username: { $regex: new RegExp(`^${username}$`), $options: 'i' },
        });
        const verificationToken = crypto.randomBytes(20).toString('hex');
        const currentURL = req.protocol + '://' + req.get('host');
        if (prevUser) {
            throw new Error('User already exists, Please log in');
        } else if (prevUsername) {
            //prettier-ignore
            throw new Error('Username already exists');
        } else {
            await User.create({
                email,
                username,
                password: hash,
                verified: false,
                verificationToken: verificationToken,
                tokenExpire: moment(new Date()).add(1, 'hours'),
            });
            await sendEmail(email, `${currentURL}/verify/${verificationToken}`);
            next();
        }
    } catch (err) {
        if (
            err.message ===
            'User validation failed: username: Path `username` is invalid (Disala Damsas).'
        ) {
            req.flash('error', 'Username validation failed');
            res.redirect('/auth/signup');
            return;
        }
        req.flash('error', err.message);
        res.redirect('/auth/signup');
    }
};
