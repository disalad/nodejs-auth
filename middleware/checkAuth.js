exports.authed = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};

exports.notAuthed = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        next();
    }
};
