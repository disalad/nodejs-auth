const User = require('../models/User');

exports.verify_page = (req, res, next) => {
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

exports.verify_user = async (req, res, next) => {
    try {
        const token = req.params.token;
        // Prevent verifing others accounts
        if (!req.user.verificationToken === token) {
            res.redirect('/verify');
            return;
        }
        // Mark user as a verified user
        const user = await User.findOne({ verificationToken: token });
        user.verificationToken = undefined;
        user.verified = true;
        await user.save();
        req.logout();
        req.flash('success', 'Account is now verified. Please log in again');
        res.redirect('/auth/login');
    } catch (err) {
        console.log(err);
    }
};
