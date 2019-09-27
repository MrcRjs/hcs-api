const mongoose = require('mongoose');
const User = require('../models/users');
const dbUri = process.env.DB_URI;
const jwt = require('jsonwebtoken');

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
    login: (req, res) => {
        const {email, password} = req.body;

        mongoose.connect(dbUri, {useNewUrlParser: true}, (err) => {
            let result = {};
            let status = 200;
            if (!err) {
                User.findOne({'user.email': email}, (err, account) => {
                    if (!err && account) {
                        account.comparePassword(password, (err, match) => {
                            if (err) {
                                status = 500;
                                result.status = status;
                                result.error = err;
                                res.status(status).send(result);
                            }
                            else if (!err && match) {
                                status = 200;
                                // Create a token
                                const payload = {user: { email: account.user.email }};
                                const options = {expiresIn: '1d'};
                                const secret = process.env.JWT_SECRET;
                                result.token = jwt.sign(payload, secret, options);
                                result.status = status;
                            } else {
                                status = 401;
                                result.status = status;
                                result.error = `Authentication error`;
                            }
                            res.status(status).send(result);
                        });
                    } else {
                        status = 404;
                        result.status = status;
                        result.error = err;
                        res.status(status).send(result);
                    }
                });
            } else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        });
    }
};