exports.authed = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/auth/login');
    }
};

exports.notAuthed = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/auth/login');
    } else {
        next();
    }
};
