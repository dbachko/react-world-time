'use strict';

var React = require('react');
var moment = require('moment-timezone');
var SetIntervalMixin = require('./SetIntervalMixin');
var ClockContainer = require('./components/ClockContainer');
var SearchBar = require('./components/Search');
var SunCalc = require('suncalc');
var _ = require('lodash');

var WorldTime = React.createClass({
  displayName: 'WorldTime',

  mixins: [SetIntervalMixin],

  propTypes: {
    isEditOn: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      time: moment(),
      cities: [{
        name: 'New York City',
        tz: 'America/New_York',
        geopoint: {
          lat: 40.71427,
          lon: -74.00597
        }
      }]
    };
  },

  getInitialState: function getInitialState() {
    return {
      time: this.props.time,
      cities: this.props.cities
    };
  },

  componentDidMount: function componentDidMount() {
    this.setInterval(this.tick, 1000);
    this.calcSun();
  },

  tick: function tick() {
    this.setState({ time: moment() });
  },

  addCity: function addCity(city, cityObject) {
    if (!cityObject.length) return;

    var _cityObject$0 = cityObject[0];
    var tz = _cityObject$0.timezone;
    var name = _cityObject$0.label;
    var geopoint = _cityObject$0.geopoint;

    this.state.cities.push({ tz: tz, name: name, geopoint: geopoint });
    this.calcSun();
  },

  handleRemoveClock: function handleRemoveClock(key) {
    this.setState({
      cities: this.state.cities.filter(function (el, idx) {
        return idx !== key;
      })
    });
  },

  calcSun: function calcSun() {
    var _this = this;

    this.setState({
      cities: this.state.cities.map(function (city, idx) {
        var time = _this.state.time;
        var _city$geopoint = city.geopoint;
        var lat = _city$geopoint.lat;
        var lon = _city$geopoint.lon;

        var _SunCalc$getTimes = SunCalc.getTimes(time, lat, lon);

        var sunset = _SunCalc$getTimes.sunset;
        var sunrise = _SunCalc$getTimes.sunrise;

        return _.assign(city, {
          isDay: time.isBetween(sunrise, sunset)
        });
      })
    });
  },

  render: function render() {
    var _this2 = this;

    return React.createElement(
      'div',
      { className: 'clock' },
      this.state.cities.map(function (city, key) {
        return React.createElement(ClockContainer, {
          key: key,
          city: city,
          time: _this2.state.time.clone().tz(city.tz),
          removeClock: _this2.handleRemoveClock.bind(_this2, key),
          showRemove: _this2.props.isEditOn
        });
      }),
      React.createElement(SearchBar, {
        showSearch: this.props.isEditOn,
        onAddCity: this.addCity })
    );
  }

});

module.exports = WorldTime;