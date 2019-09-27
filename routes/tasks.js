const controller = require('../controllers/tasks');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
    router.route('/tasks')
        .get(validateToken, controller.getAllTasks)
        .post(validateToken, controller.createTask)
        .patch(validateToken, controller.updateTask)
        .delete(validateToken, controller.deleteTask);
};