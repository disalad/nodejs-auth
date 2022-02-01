exports.authed = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/auth/login');
    }
};

exports.notAuthed = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        next();
    }
};

exports.verified = (req, res, next) => {
    if (req.user.verified) {
        next();
    } else {
        res.redirect('/verify');
    }
};

exports.notVerified = (req, res, next) => {
    if (!req.user.verified) {
        next();
    } else {
        res.redirect('/');
    }
};

exports.anyAuthVerified = (req, res, next) => {
    if (req.user ? req.user.verified : false) {
        next();
    } else {
        res.redirect('/verify');
    }
};
