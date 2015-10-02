'use strict';

var React = require('react');
var moment = require('moment-timezone');
var DigiClock = require('./DigiClock');
var AnalogClock = require('./AnalogClock');

var ClockContainer = React.createClass({
  displayName: 'ClockContainer',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'clock-container' },
      this.props.showRemove ? React.createElement(
        'div',
        { className: 'clock-el btn-remove-container' },
        React.createElement('div', { className: 'btn btn-remove', onClick: this.props.removeClock })
      ) : null,
      React.createElement(
        'div',
        { className: 'clock-el' },
        React.createElement(
          'span',
          null,
          this.props.name
        )
      ),
      React.createElement(AnalogClock, { time: this.props.time }),
      React.createElement(DigiClock, { time: this.props.time })
    );
  }

});

module.exports = ClockContainer;