'use strict';

const _ = require('lodash');
const React = require('react');
const moment = require('moment-timezone');

var DigiClock = React.createClass({

  dayDiff (date) {
    let now = moment();
    if(date.isBefore(now, 'day')) {
      return 'Yesterday';
    }
    if(date.isAfter(now, 'day')) {
      return 'Tomorrow';
    }
    return 'Today';
  },

  render () {
    return (
      <div className='clock-el clock-el__digital'>
        <div>{this.props.time.format('LT')}</div>
        <div>{this.dayDiff(this.props.time)}</div>
      </div>
    );
  }

});


module.exports = DigiClock;
