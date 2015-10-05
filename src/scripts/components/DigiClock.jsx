'use strict';

const _ = require('lodash');
const React = require('react');
const moment = require('moment-timezone');

var DigiClock = React.createClass({

  getDayName () {
    let currentDay = this.props.time.format('DDD'),
        localDay = moment().format('DDD');
    if(currentDay > localDay) {
      return 'Tomorrow';
    }
    if(currentDay < localDay) {
      return 'Yesterday';
    }
    return 'Today';
  },

  render () {
    return (
      <div className='clock-el__digital'>
        <span>{this.getDayName()} </span>
        <span>{this.props.time.format('LT')}</span>
      </div>
    );
  }

});


module.exports = DigiClock;
