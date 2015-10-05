'use strict';

const React = require('react');
const moment = require('moment-timezone');
const DigiClock = require('./DigiClock');
const AnalogClock = require('./AnalogClock');


var ClockContainer = React.createClass({

  render () {
    return (
      <div className='clock-container'>
        {
          this.props.showRemove ? (
            <div className='clock-el btn-remove-container'>
              <div className='btn btn-remove' onClick={this.props.removeClock} />
            </div>
          ) : null
        }
        <div className='clock-el clock-city'>
          <div className='clock-el__cityname'>{this.props.city.name}</div>
          <DigiClock time={this.props.time} />
        </div>
        <AnalogClock
          time={this.props.time}
          city={this.props.city}/>
      </div>
    );
  }

});


module.exports = ClockContainer;
