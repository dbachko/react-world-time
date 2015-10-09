'use strict';

var _ = require('lodash');
var React = require('react');
var moment = require('moment-timezone');

var DigiClock = React.createClass({
  displayName: 'DigiClock',

  getDayName: function getDayName() {
    var currentDay = this.props.time.format('DDD'),
        localDay = moment().format('DDD');
    if (currentDay > localDay) {
      return 'Tomorrow';
    }
    if (currentDay < localDay) {
      return 'Yesterday';
    }
    return 'Today';
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'clock-el__digital' },
      React.createElement(
        'span',
        null,
        this.getDayName(),
        ' '
      ),
      React.createElement(
        'span',
        null,
        this.props.time.format('LT')
      )
    );
  }

});

module.exports = DigiClock;