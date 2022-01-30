const User = require('../models/User');
const path = require('path');

exports.update_profile = async (req, res, next) => {
    const uploadFile = (req, res) => {
        return new Promise((resolve, reject) => {
            const id = req.user.id.toString();
            const file = req.files.file;
            const fileName = file.name;
            const ext = path.extname(fileName || '').split('.');
            const ex = ext[ext.length - 1];
            const pathName = path.join(__dirname + `../../uploads/${id}.${ex}`);
            file.mv(pathName, err => {
                if (err) {
                    console.log(err.message);
                    reject(err);
                } else {
                    resolve(`/uploads/${id}.${ex}`);
                }
            });
        });
    };

    try {
        const email = req.user.email;
        let fileUrl;
        if (req.files) {
            fileUrl = await uploadFile(req, res);
        }
        const updateObj = {
            ...(fileUrl && { imgUrl: fileUrl }),
            ...(req.body.name && { username: req.body.name }),
            ...(req.body.about.length <= 20 && req.body.about && { bio: req.body.about }),
        };
        await User.findOneAndUpdate({ email: email }, updateObj, { upsert: true });
        res.redirect('/profile');
    } catch (err) {
        console.log('ERRORRR: ', err.message);
        res.send(err);
    }
};
