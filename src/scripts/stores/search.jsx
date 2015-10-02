'use strict';

const Reflux = require('reflux');
const Actions = require('../actions/actions');

var searchTerm = '';

var SearchStore = Reflux.createStore({
  listenables: Actions,

  getInitialState () {
    return { searchTerm };
  },

  onUpdateSearchTerm (val) {
    searchTerm = val;
    this.trigger({searchTerm});
  },

  onClearSearchTerm () {
    searchTerm = '';
    this.trigger({searchTerm});
  }

});

module.exports = SearchStore;
