const User = require('../models/User');

exports.delete_acc = async (req, res, next) => {
    try {
        await User.findOneAndRemove({ email: req.user.email });
        req.logout();
        next();
    } catch (err) {
        console.log('Error: ', err.message);
    }
};
