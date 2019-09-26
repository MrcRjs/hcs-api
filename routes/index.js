const tasks = require('./tasks');

module.exports = (router) => {
  tasks(router);
  return router;
};