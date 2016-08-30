var issueController = require('../controllers/issues.js');
   
module.exports = function(router, config) {

  router.get('/issues', issueController.get);
};
