const controller = require('../controllers/tasks');

module.exports = (router) => {
    router.route('/tasks')
        .get(controller.getAllTasks)
        .post(controller.createTask)
        .patch(controller.updateTask)
        .delete(controller.deleteTask);
};