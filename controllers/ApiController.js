const User = require('../models/User');

exports.check_username = async (req, res) => {
    try {
        const prevUser = await User.findOne({
            username: { $regex: new RegExp(`^${req.body.username}$`), $options: 'i' },
        });
        if (prevUser && prevUser.id !== req.user.id) {
            res.status(422).json({ available: false });
        } else {
            res.status(200).json({ available: true });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.users = async (req, res) => {
    try {
        const skipCount = (req.query.skip || 0) * 5;
        const users = await User.find({}).skip(skipCount).limit(5);
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
