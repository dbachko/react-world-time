var Reflux = require('reflux');

var Actions = Reflux.createActions({

  'updateSearchTerm': {},
  'clearSearchTerm': {},
  'updateCitiesList': { asyncResult: true }

});

module.exports = Actions;
