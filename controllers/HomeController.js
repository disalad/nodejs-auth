const User = require('../models/User');

exports.home_page = async (req, res) => {
    try {
        const userCount = (req.query.page || 1) * 5;
        const users = await User.find({}).limit(userCount);
        const resultsEnd = userCount <= users.length ? false : true;
        res.render('home', {
            user: req.user,
            users: users,
            endOfResults: resultsEnd,
        });
    } catch (err) {
        res.send(err.message);
    }
};
