#Spotify Web API Node - Performance Optimizations

This is a fork from the [Spotify Web API Node](https://github.com/thelinmichael/spotify-web-api-node)

The fork was made to implement a solution to the common [Web Api Error 429 - Too many requests](https://github.com/thelinmichael/spotify-web-api-node/issues?utf8=%E2%9C%93&q=429)

The first lines in src/http-manager.js have changed from:

```javascript
'use strict';

var superagent = require('superagent'),
    WebApiError = require('./webapi-error');

var HttpManager = {};
```

To:

```javascript
require('superagent-cache')(superagent);

var Throttle = require('superagent-throttle');
var throttle = new Throttle({
    active: true,     // set false to pause queue
    rate: 10,          // how many requests can be sent every `ratePer`
    ratePer: 1000,   // number of ms in which `rate` requests may be sent
    concurrent: 2    // how many requests can be sent concurrently
})
```
*The superagent-cache plugin was implemented to minimize the network usage of redundant data.
*The superagent-throttle plugin takes care of spacing the requests. The shown settings are the ones we found adequate for our project but feel free to alter them

More documentation about them can be found at their repositories:
[superagent-cache ](https://github.com/jpodwys/superagent-cache)
[superagent-throttle](https://github.com/leviwheatcroft/superagent-throttle)
