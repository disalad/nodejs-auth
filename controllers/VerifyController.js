const User = require('../models/User');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

exports.verify_page = (req, res) => {
    const hideEmail = function (email) {
        return email.replace(/(.{2})(.*)(?=@)/, function (gp1, gp2, gp3) {
            for (let i = 0; i < gp3.length; i++) {
                gp2 += '*';
            }
            return gp2;
        });
    };
    res.render('verify', { email: hideEmail(req.user.email) });
};

exports.verify_user = async (req, res) => {
    try {
        const token = req.params.token;
        // Prevent verifing others accounts
        if (!req.user.verificationToken === token) throw new Error('Error while verifing user account');
        // Mark user as a verified user
        const user = await User.findOne({ verificationToken: token });
        if (!user) throw new Error('Error while verifing user account');
        user.verificationToken = undefined;
        user.verified = true;
        await user.save();
        req.logout();
        req.flash('success', 'Account is now verified. Please log in again');
        res.redirect('/auth/login');
        // eslint-disable-next-line no-empty
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/verify');
    }
};

exports.resend_email = async (req, res) => {
    try {
        const email = req.user.email;
        const currentURL = req.protocol + '://' + req.get('host');
        const user = await User.findOne({ verificationToken: req.user.verificationToken });
        if (!user) throw new Error('Error');
        const newToken = crypto.randomBytes(20).toString('hex');
        user.verificationToken = newToken;
        await user.save();
        await sendEmail(email, `${currentURL}/verify/${newToken}`);
        req.flash('success', 'The new verification link has sent to your email');
        res.redirect('/verify');
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/verify');
    }
};
