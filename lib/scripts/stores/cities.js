'use strict';

var Reflux = require('reflux');
var Actions = require('../actions/actions');
var apiRequests = require('../utils/api-requests');

var citiesList = [];

var CitiesStore = Reflux.createStore({
  listenables: Actions,

  getInitialState: function getInitialState() {
    return { citiesList: citiesList };
  },

  onUpdateCitiesList: function onUpdateCitiesList(input, callback) {
    apiRequests.getOptionsList(input).end(function (err, response) {
      if (response && response.ok) {
        Actions.updateCitiesList.completed(response.body, callback);
      } else {
        Actions.updateCitiesList.failed(err, callback);
      }
    });
  },

  onUpdateCitiesListCompleted: function onUpdateCitiesListCompleted(cities, callback) {
    citiesList = cities.map(function (city) {
      var label = city.name;
      var timezone = city.timezone;
      var geopoint = city.geopoint;

      return {
        value: label,
        label: label,
        geopoint: geopoint,
        timezone: timezone
      };
    });
    callback(null, {
      options: citiesList,
      complete: false
    });
    // this.trigger({citiesList});
  },

  onUpdateCitiesListFailed: function onUpdateCitiesListFailed(err, callback) {
    citiesList = [];
    callback(null, {
      options: citiesList,
      complete: false
    });
    // this.trigger({citiesList});
  }

});

module.exports = CitiesStore;