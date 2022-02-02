const User = require('../models/User');

exports.check_username = async (req, res) => {
    console.log('Input: ', req.body);
    const prevUser = await User.findOne({ username: req.body.username });
    if (prevUser) {
        console.log('User exists', prevUser);
        res.status(422).json({ available: false });
    } else {
        // eslint-disable-next-line quotes
        console.log("User doesn't exists", prevUser);
        res.status(200).json({ available: true });
    }
};
