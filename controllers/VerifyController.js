exports.verify_page = (req, res, next) => {
    const hideEmail = function (email) {
        return email.replace(/(.{2})(.*)(?=@)/, function (gp1, gp2, gp3) {
            for (let i = 0; i < gp3.length; i++) {
                gp2 += '*';
            }
            return gp2;
        });
    };
    res.render('verify', { email: hideEmail(req.user.email) });
};

exports.verify_user = (req, res, next) => {
    // router code here
};
