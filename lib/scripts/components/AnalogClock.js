'use strict';

var React = require('react');
var moment = require('moment-timezone');
var _ = require('lodash');

var AnalogClock = React.createClass({
  displayName: 'AnalogClock',

  getHourMarks: function getHourMarks() {
    return _.range(0, 360, 30).map(function (angle, idx) {
      return React.createElement('rect', {
        key: 'hm' + idx,
        width: '2.5',
        height: '5',
        x: '48.75',
        y: '5',
        transform: 'rotate(' + angle + ' 50 50)',
        fill: '#666' });
    });
  },

  getHoursHand: function getHoursHand() {
    var hours = this.props.time.hours();
    return React.createElement('rect', {
      key: 'h',
      width: '3.25',
      height: '17',
      x: '48.375',
      y: '33',
      fill: 'rgb(39,39,39)',
      transform: 'rotate(' + hours * 30 + ' 50 50)' });
  },

  getMinutesHand: function getMinutesHand() {
    var minutes = this.props.time.minutes();
    return React.createElement('rect', {
      key: 'm',
      width: '3.25',
      height: '29',
      x: '48.375',
      y: '20',
      fill: 'rgb(39,39,39)',
      transform: 'rotate(' + minutes * 6 + ' 50 50)' });
  },

  getSecondsHand: function getSecondsHand() {
    var seconds = this.props.time.seconds();
    return React.createElement('rect', {
      key: 's',
      width: '1.5',
      height: '31',
      x: '49.25',
      y: '19',
      fill: 'rgb(255,95,86)',
      transform: 'rotate(' + seconds * 6 + ' 50 50)' });
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'clock-el clock-el__analog' },
      React.createElement(
        'svg',
        { width: '100%', height: '100%', viewBox: '0 0 100 100' },
        React.createElement('ellipse', { rx: '50', ry: '50', cx: '50', cy: '50', fill: 'rgb(243,243,243)' }),
        this.getHourMarks(),
        this.getHoursHand(),
        this.getMinutesHand(),
        React.createElement('ellipse', { rx: '3.75', ry: '3.75', cx: '50', cy: '50', fill: 'rgb(39,39,39)' }),
        this.getSecondsHand(),
        React.createElement('ellipse', { rx: '1.75', ry: '1.75', cx: '50', cy: '50', fill: 'rgb(255,95,86)' })
      )
    );
  }

});

module.exports = AnalogClock;