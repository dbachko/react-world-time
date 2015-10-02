'use strict';

var React = require('react');
var moment = require('moment-timezone');
var SetIntervalMixin = require('./SetIntervalMixin');
var ClockContainer = require('./components/ClockContainer');
var SearchBar = require('./components/Search');

var WorldClock = React.createClass({
  displayName: 'WorldClock',

  mixins: [SetIntervalMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      time: moment(),
      cities: [{
        name: 'UTC',
        tz: 'UTC'
      }]
    };
  },

  getInitialState: function getInitialState() {
    return {
      time: this.props.time,
      cities: this.props.cities,
      showSearch: false,
      showRemove: false
    };
  },

  componentDidMount: function componentDidMount() {
    this.setInterval(this.tick, 1000);
  },

  tick: function tick() {
    this.setState({ time: moment() });
  },

  toggleCitySearch: function toggleCitySearch() {
    this.setState({
      showSearch: !this.state.showSearch
    });
  },

  toggleCityRemove: function toggleCityRemove() {
    this.setState({
      showRemove: !this.state.showRemove
    });
  },

  addCity: function addCity(city, cityObject) {
    if (!cityObject.length) return;

    var _cityObject$0 = cityObject[0];
    var tz = _cityObject$0.timezone;
    var name = _cityObject$0.label;

    this.state.cities.push({ tz: tz, name: name });
    this.toggleCitySearch();
  },

  handleRemoveClock: function handleRemoveClock(key) {
    this.setState({
      cities: this.state.cities.filter(function (el, idx) {
        return idx !== key;
      })
    });
  },

  render: function render() {
    var _this = this;

    return React.createElement(
      'div',
      { className: 'clock' },
      this.state.cities.map(function (city, key) {
        return React.createElement(ClockContainer, {
          key: key,
          time: _this.state.time.clone().tz(city.tz),
          name: city.name,
          removeClock: _this.handleRemoveClock.bind(_this, key),
          showRemove: _this.state.showRemove
        });
      }),
      React.createElement(SearchBar, {
        showSearch: this.state.showSearch,
        onAddCity: this.addCity }),
      React.createElement(
        'button',
        { onClick: this.toggleCitySearch },
        '+'
      ),
      React.createElement(
        'button',
        { onClick: this.toggleCityRemove },
        '-'
      )
    );
  }

});

module.exports = WorldClock;