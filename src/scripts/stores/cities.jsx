'use strict';

const Reflux = require('reflux');
const Actions = require('../actions/actions');
const apiRequests = require('../utils/api-requests');

var citiesList = [];

var CitiesStore = Reflux.createStore({
  listenables: Actions,

  getInitialState () {
    return { citiesList };
  },

  onUpdateCitiesList (input, callback) {
    apiRequests
      .getOptionsList(input)
      .end(function (err, response) {
        if (response && response.ok) {
          Actions.updateCitiesList.completed(response.body, callback);
        } else {
          Actions.updateCitiesList.failed(err, callback);
        }
      });
  },

  onUpdateCitiesListCompleted (cities, callback) {
    citiesList = cities.map((city) => {
      let {name: label, timezone, geopoint} = city;
      return {
        value: label,
        label,
        geopoint,
        timezone
      }
    });
    callback(null, {
        options: citiesList,
        complete: false
    });
    // this.trigger({citiesList});
  },

  onUpdateCitiesListFailed (err, callback) {
    citiesList = [];
    callback(null, {
        options: citiesList,
        complete: false
    });
    // this.trigger({citiesList});
  }

});

module.exports = CitiesStore;
