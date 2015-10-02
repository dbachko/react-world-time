'use strict';

var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var SearchStore = require('../stores/search');
var CitiesStore = require('../stores/cities');
var Select = require('react-select');
var _ = require('lodash');

var Search = React.createClass({
  displayName: 'Search',

  mixins: [Reflux.ListenerMixin, Reflux.connect(SearchStore), Reflux.connect(CitiesStore)],

  componentWillMount: function componentWillMount() {
    this.updateCitiesList = _.debounce(this.updateCitiesList, 300);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.showSearch === false) {
      Actions.updateSearchTerm('');
    }
  },

  updateCitiesList: function updateCitiesList(input, callback) {
    Actions.updateCitiesList(input, callback);
  },

  clearSearch: function clearSearch() {
    Actions.clearSearchTerm();
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'search-bar' },
      this.props.showSearch ? React.createElement(Select, {
        autoFocus: true,
        name: 'search-city',
        value: this.state.searchTerm,
        onChange: this.props.onAddCity,
        className: 'search-city',
        type: 'text',
        placeholder: ' Search...',
        options: this.state.citiesList,
        autoload: false,
        asyncOptions: this.updateCitiesList }) : null
    );
  }
});

module.exports = Search;