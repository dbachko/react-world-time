'use strict';

const React = require('react');
const moment = require('moment-timezone');
const _ = require('lodash');

const COLORS = {
  concrete: 'rgb(243,243,243)',
  nero: 'rgb(39,39,39)',
  steel: 'rgb(102,102,102)',
  sunset: 'rgb(255,95,86)'
};

var AnalogClock = React.createClass({

  getHourMarks () {
    return _.range(0, 360, 30).map((angle, idx) => {
      return <rect
        key={`hm${idx}`}
        width='2.5'
        height='10.5'
        x='48.75'
        y='5'
        transform={`rotate(${angle} 50 50)`}
        fill={COLORS.steel}/>
    });
  },

  getHoursHand () {
    let hours = this.props.time.hours();
    return <rect
      key='h'
      width='3.25'
      height='17'
      x='48.375'
      y='33'
      fill={COLORS.nero}
      transform={`rotate(${hours * 30} 50 50)`}/>
  },

  getMinutesHand () {
    let minutes = this.props.time.minutes();
    return <rect
      key='m'
      width='3.25'
      height='29'
      x='48.375'
      y='20'
      fill={COLORS.nero}
      transform={`rotate(${minutes * 6} 50 50)`}/>
  },

  getSecondsHand () {
    let seconds = this.props.time.seconds();
    return <rect
      key='s'
      width='1.5'
      height='34'
      x='49.25'
      y='21'
      fill={COLORS.sunset}
      transform={`rotate(${seconds * 6} 50 50)`}/>
  },

  render () {
    return (
      <div className='clock-el clock-el__analog'>

        <svg width='100%' height='100%' viewBox='0 0 100 100'>

          <ellipse rx='50' ry='50' cx='50' cy='50' fill={COLORS.concrete}></ellipse>

          { this.getHourMarks() }

          { this.getHoursHand() }

          { this.getMinutesHand() }

          <ellipse rx='3.75' ry='3.75' cx='50' cy='50' fill={COLORS.nero}></ellipse>

          { this.getSecondsHand() }

          <ellipse rx='1.75' ry='1.75' cx='50' cy='50' fill={COLORS.sunset}></ellipse>

        </svg>

      </div>
    );
  }

});


module.exports = AnalogClock;
