'use strict';

const React = require('react');
const moment = require('moment-timezone');
const SetIntervalMixin = require('./SetIntervalMixin');
const ClockContainer = require('./components/ClockContainer');
const SearchBar = require('./components/Search');


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
        tz: 'America/New_York'
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
  },

  tick () {
    this.setState({ time: moment() });
  },

  addCity (city, cityObject) {
    if(!cityObject.length) return;

    let {timezone: tz, label: name} = cityObject[0];
    this.state.cities.push({ tz, name });
  },

  handleRemoveClock (key) {
    this.setState({
      cities: this.state.cities.filter((el, idx) => {
        return idx !== key;
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
              time: this.state.time.clone().tz(city.tz),
              name: city.name,
              removeClock: this.handleRemoveClock.bind(this, key),
              showRemove: this.props.isEditOn
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
