'use strict';

const React = require('react');
const moment = require('moment-timezone');
const SetIntervalMixin = require('./SetIntervalMixin');
const ClockContainer = require('./components/ClockContainer');
const SearchBar = require('./components/Search');


var WorldTime = React.createClass({

  mixins: [SetIntervalMixin],

  getDefaultProps () {
    return {
      time: moment(),
      cities: [{
        name: 'UTC',
        tz: 'UTC'
      }]
    };
  },

  getInitialState () {
    return {
      time: this.props.time,
      cities: this.props.cities,
      showSearch: false,
      showRemove: false
    };
  },

  componentDidMount () {
    this.setInterval(this.tick, 1000);
  },

  tick () {
    this.setState({ time: moment() });
  },

  toggleCitySearch () {
    this.setState({
      showSearch: !this.state.showSearch
    });
  },

  toggleCityRemove () {
    this.setState({
      showRemove: !this.state.showRemove
    });
  },

  addCity (city, cityObject) {
    if(!cityObject.length) return;

    let {timezone: tz, label: name} = cityObject[0];
    this.state.cities.push({ tz, name });
    this.toggleCitySearch();
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
              showRemove: this.state.showRemove
            })
          })
        }
        <SearchBar
          showSearch={this.state.showSearch}
          onAddCity={this.addCity} />
        <button onClick={this.toggleCitySearch}>+</button>
        <button onClick={this.toggleCityRemove}>-</button>
      </div>
    );
  }

});


module.exports = WorldTime;
