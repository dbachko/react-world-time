'use strict';

const request = require('superagent');


var apiRequests = {
  searchUrl: 'http://geonames.bo4a.me:3001/api/cities',

  getOptionsList (input) {
    let params = {
      'body': {
        'sort': [{
          'population': 'desc'
        }],
        'query': {
          'match': {
            'name': {
              'query': input,
              'fuzziness': 2
            }
          }
        }
      }
    };

    return request
      .get(this.searchUrl)
      .query({ filter: JSON.stringify(params) })
      .set('Accept', 'application/json');
  }
};

module.exports = apiRequests;
