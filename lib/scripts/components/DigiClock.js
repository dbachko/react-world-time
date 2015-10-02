'use strict';

var _ = require('lodash');
var React = require('react');
var moment = require('moment-timezone');

var DigiClock = React.createClass({
  displayName: 'DigiClock',

  dayDiff: function dayDiff(date) {
    var now = moment();
    if (date.isBefore(now, 'day')) {
      return 'Yesterday';
    }
    if (date.isAfter(now, 'day')) {
      return 'Tomorrow';
    }
    return 'Today';
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'clock-el clock-el__digital' },
      React.createElement(
        'div',
        null,
        this.props.time.format('LT')
      ),
      React.createElement(
        'div',
        null,
        this.dayDiff(this.props.time)
      )
    );
  }

});

module.exports = DigiClock;