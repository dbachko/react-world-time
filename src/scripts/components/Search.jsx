'use strict';

const React = require('react');
const Reflux = require('reflux');
const Actions = require('../actions/actions');
const SearchStore = require('../stores/search');
const CitiesStore = require('../stores/cities');
const Select = require('react-select');
const _ = require('lodash');


var Search = React.createClass({
  mixins: [
    Reflux.ListenerMixin,
    Reflux.connect(SearchStore),
    Reflux.connect(CitiesStore)
  ],

  componentWillMount () {
    this.updateCitiesList = _.debounce(this.updateCitiesList, 300);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.showSearch === false) {
      Actions.updateSearchTerm('');
    }
  },

  updateCitiesList (input, callback) {
    Actions.updateCitiesList(input, callback);
  },

  clearSearch () {
    Actions.clearSearchTerm();
  },

  render () {
    return (
      <div className='search-bar'>
        {
          this.props.showSearch ? (
            <Select
              autoFocus
              name="search-city"
              value={this.state.searchTerm}
              onChange={this.props.onAddCity}
              className='search-city'
              type='text'
              placeholder=' Search...'
              options={this.state.citiesList}
              autoload={false}
              asyncOptions={this.updateCitiesList} />) : null
        }
      </div>
    );
  }
});

module.exports = Search;
