'use strict';

const React = require('react');
const moment = require('moment-timezone');
const SetIntervalMixin = require('./SetIntervalMixin');
const ClockContainer = require('./components/ClockContainer');
const SearchBar = require('./components/Search');
const SunCalc = require('suncalc');
const _ = require('lodash');

var WorldTime = React.createClass({

  mixins: [SetIntervalMixin],

  propTypes: {
    isEditOn: React.PropTypes.bool
  },

  getDefaultProps () {
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

  getInitialState () {
    return {
      time: this.props.time,
      cities: this.props.cities
    };
  },

  componentDidMount () {
    this.setInterval(this.tick, 1000);
    this.calcSun();
  },

  tick () {
    this.setState({ time: moment() });
  },

  addCity (city, cityObject) {
    if(!cityObject.length) return;

    let {timezone: tz, label: name, geopoint} = cityObject[0];
    this.state.cities.push({tz, name, geopoint});
    this.calcSun();
  },

  handleRemoveClock (key) {
    this.setState({
      cities: this.state.cities.filter((el, idx) => {
        return idx !== key;
      })
    });
  },

  calcSun () {
    this.setState({
      cities: this.state.cities.map((city, idx) => {
        let {time} = this.state,
            {lat, lon} = city.geopoint,
            {sunset, sunrise} = SunCalc.getTimes(time, lat, lon);
        return _.assign(city, {
          isDay: time.isBetween(sunrise, sunset)
        });
      })
    });
  },

  render () {
    return (
      <div className='clock'>
        {
          this.state.cities.map((city, key) => {
            return React.createElement(ClockContainer, {
              key,
              city,
              time: this.state.time.clone().tz(city.tz),
              removeClock: this.handleRemoveClock.bind(this, key),
              showRemove: this.props.isEditOn,
            })
          })
        }
        <SearchBar
          showSearch={this.props.isEditOn}
          onAddCity={this.addCity} />
      </div>
    );
  }

});


module.exports = WorldTime;
