'use strict';

const React = require('react');
const moment = require('moment-timezone');
const _ = require('lodash');

var AnalogClock = React.createClass({

  getHourMarks () {
    return _.range(0, 360, 30).map((angle, idx) => {
      return <rect
        key={`hm${idx}`}
        width='2.5'
        height='5'
        x='48.75'
        y='5'
        transform={`rotate(${angle} 50 50)`}
        fill='#666'/>
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
      fill='rgb(39,39,39)'
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
      fill='rgb(39,39,39)'
      transform={`rotate(${minutes * 6} 50 50)`}/>
  },

  getSecondsHand () {
    let seconds = this.props.time.seconds();
    return <rect
      key='s'
      width='1.5'
      height='31'
      x='49.25'
      y='19'
      fill='rgb(255,95,86)'
      transform={`rotate(${seconds * 6} 50 50)`}/>
  },

  render () {
    return (
      <div className='clock-el clock-el__analog'>

        <svg width='100%' height='100%' viewBox='0 0 100 100'>

          <ellipse rx='50' ry='50' cx='50' cy='50' fill='rgb(243,243,243)'></ellipse>

          { this.getHourMarks() }

          { this.getHoursHand() }

          { this.getMinutesHand() }

          <ellipse rx='3.75' ry='3.75' cx='50' cy='50' fill='rgb(39,39,39)'></ellipse>

          { this.getSecondsHand() }

          <ellipse rx='1.75' ry='1.75' cx='50' cy='50' fill='rgb(255,95,86)'></ellipse>

        </svg>

      </div>
    );
  }

});


module.exports = AnalogClock;
