'use strict';
module.exports = function(app) {
  var restAPI = require ("./controller")

  // todoList Routes
  app.route('/myApi')
    .get(restAPI.myRestAPI)
    .post();

};
