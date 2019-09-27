const tasks = require('./tasks');
const users = require('./users');

module.exports = (router) => {
  users(router);
  tasks(router);
  return router;
};