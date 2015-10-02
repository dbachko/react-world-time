'use strict';

var Reflux = require('reflux');
var Actions = require('../actions/actions');

var searchTerm = '';

var SearchStore = Reflux.createStore({
  listenables: Actions,

  getInitialState: function getInitialState() {
    return { searchTerm: searchTerm };
  },

  onUpdateSearchTerm: function onUpdateSearchTerm(val) {
    searchTerm = val;
    this.trigger({ searchTerm: searchTerm });
  },

  onClearSearchTerm: function onClearSearchTerm() {
    searchTerm = '';
    this.trigger({ searchTerm: searchTerm });
  }

});

module.exports = SearchStore;