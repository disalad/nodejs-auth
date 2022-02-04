const User = require('../models/User');

exports.home_page = async (req, res) => {
    try {
        const skipCount = (req.query.skip || 0) * 5;
        const users = await User.find({}).skip(skipCount).limit(5);
        res.render('home', { user: req.user, users: users });
    } catch (err) {
        res.send(err.message);
    }
};
