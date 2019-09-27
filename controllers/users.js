const mongoose = require('mongoose');
const User = require('../models/users');
const dbUri = process.env.DB_URI;

module.exports = {
    add: (req, res) => {
        mongoose.connect(dbUri, {useNewUrlParser: true}, (err) => {
            let result = {};
            let status = 201;
            if (!err) {
                const {name, email, password} = req.body;
                const user = new User({user: {name, email, password}, tasks: []});
                user.save((err, user) => {
                    if (!err) {
                        result.status = status;
                        result.result = user;
                    } else {
                        status = 500;
                        result.status = status;
                        result.error = err;
                    }
                    res.status(status).send(result);
                });
            } else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        });
    },
};