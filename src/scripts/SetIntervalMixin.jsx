'use strict';

var SetIntervalMixin = {

  componentWillMount () {
    this.intervals = [];
  },

  setInterval () {
    this.intervals.push(setInterval.apply(null, arguments));
  },

  componentWillUnmount () {
    this.intervals.map(clearInterval);
  }

};


module.exports = SetIntervalMixin;
