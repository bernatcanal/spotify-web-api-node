var restler = require('restler');

var HttpManager = {};

HttpManager.get = function(request, callback) {
  'use strict';

  var options = {};
  if (request.getQueryParameters()) {
    options.query = request.getQueryParameters();
  }

  restler.get(request.getURI(), options)
    .on('success', function(data, response) {
      callback(null, data);
    })
    .on('fail', function(data, response) {
      callback(data);
    })
    .on('error', function(err, response) {
      callback(err);
    })
    .on('timeout', function(ms) {
      callback(new Error('Timeout'));
    });
};

HttpManager.post = function(request, callback) {
  'use strict';

  var options = {};
  if (request.getBodyParameters()) {
    options.data = request.getBodyParameters();
  }

  if (request.getHeaders()) {
    options.headers = request.getHeaders();
  }

  restler.post(request.getURI(), options)
    .on('success', function(data, response) {
      callback(null, data);
    })
    .on('fail', function(data, response) {
      callback(data);
    })
    .on('error', function(err, response) {
      callback(err);
    })
    .on('timeout', function(ms) {
      callback(new Error('Timeout'));
    });
};

module.exports = HttpManager;