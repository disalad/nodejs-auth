const User = require('../models/User');

exports.home_page = async (req, res, next) => {
    const roundToNearest5 = x => Math.ceil(x / 5) * 5;

    try {
        const page = req.query.page;
        if (page && page.length > 10) {
            return res.status(414).end();
        }
        const userCount = (Number(page) || 1) * 5;
        const docCount = await User.countDocuments({});
        if (Number(page) === 0) {
            return res.redirect('?page=1');
        } else if (page && isNaN(page)) {
            console.log('page: ', page);
            return res.redirect('?page=1');
        } else if (roundToNearest5(docCount) < userCount) {
            next();
            return;
        }
        const users = await User.find({}).limit(userCount);
        const resultsEnd = userCount < roundToNearest5(docCount) ? false : true;
        res.render('home', {
            user: req.user,
            users: users,
            endOfResults: resultsEnd,
        });
    } catch (err) {
        res.send(err.message);
    }
};
