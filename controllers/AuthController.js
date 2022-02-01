const User = require('../models/User');
const bcrypt = require('bcrypt');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

exports.delete_acc = async (req, res, next) => {
    try {
        await User.findOneAndRemove({ email: req.user.email });
        req.logout();
        next();
    } catch (err) {}
};

exports.register_user = async (req, res, next) => {
    try {
        const username = DOMPurify.sanitize(req.body.name);
        const email = DOMPurify.sanitize(req.body.email);
        const password = req.body.password;
        const hash = await bcrypt.hash(password, 10);
        const prevUser = await User.findOne({ email: email });
        const verificationToken = crypto.randomBytes(20).toString('hex');
        const currentURL = req.protocol + '://' + req.get('host');
        if (prevUser) {
            throw new Error('User already exists, Please log in');
        } else {
            await User.create({
                email,
                username,
                password: hash,
                verified: false,
                verificationToken: verificationToken,
            });
            await sendEmail(email, `${currentURL}/verify/${verificationToken}`);
            next();
        }
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/auth/signup');
    }
};
