'use strict';

var SetIntervalMixin = {

  componentWillMount: function componentWillMount() {
    this.intervals = [];
  },

  setInterval: (function (_setInterval) {
    function setInterval() {
      return _setInterval.apply(this, arguments);
    }

    setInterval.toString = function () {
      return _setInterval.toString();
    };

    return setInterval;
  })(function () {
    this.intervals.push(setInterval.apply(null, arguments));
  }),

  componentWillUnmount: function componentWillUnmount() {
    this.intervals.map(clearInterval);
  }

};

module.exports = SetIntervalMixin;