const mongoose = require('mongoose');
const User = require('../models/users');
const dbUri = process.env.DB_URI;

const fields = 'user.name user.email tasks -_id';

module.exports = {
    getAllTasks: (req, res) => {
        mongoose.connect(dbUri, {useNewUrlParser: true})
            .then(() => {
                return User.findOne({'user.email': req.decoded.user.email}, 'user.name user.email tasks -_id');
            }).then(account => {
                res.send(account);
            }).catch(err => {
               console.error("DB error: ", err);
               res.sendStatus(500);
            });
    },
    createTask: (req, res) => {
        const { title } = req.body;
        console.log(req.body);
        if (title !== undefined && title !== "") {
             mongoose.connect(dbUri, {useNewUrlParser: true})
            .then(() => {
                return User.findOneAndUpdate({'user.email': req.decoded.user.email}, {$push: {tasks: {title} }}, {fields, new: true, lean: true, runValidators: true});
            }).then((account) => {
                res.send(account);
            }).catch(err => {
               console.error("DB error: ", err);
               res.sendStatus(500);
            });
        }
        else
            {
            // Missing required value
            console.error("Missing required parameter", req);
            res.sendStatus(400);
            }
    },
    updateTask: (req, res) => {
        const { title, index } = req.body;
        if ((title !== undefined && title !== "") && (index !== undefined && index !== "")) {
            // TODO: Update task
            res.send({user: {"name": "Alice", "email": "Alice@nexus6.com"}, "tasks": ["Task 1", "Task 2"]});
        }else {
            // Missing required value
            console.error("Missing required parameter", req);
            res.sendStatus(400);
        }
    },
    deleteTask: (req, res) => {
        const { index } = req.body;
        if (index !== undefined && index !== "") {
            // TODO: Delete task
            res.send({user: {"name": "Alice", "email": "Alice@nexus6.com"}, "tasks": ["Task 1", "Task 2"]});
        }else {
            // Missing required value
            console.error("Missing required parameter", req);
            res.sendStatus(400);
        }
    }
};