const User = require('../models/User');

exports.check_username = async (req, res) => {
    const prevUser = await User.findOne({ username: req.body.username });
    if (prevUser) {
        res.status(422).json({ available: false });
    } else {
        res.status(200).json({ available: true });
    }
};
