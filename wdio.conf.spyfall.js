// require prod configuration
var prodConfig = require('./wdio.conf.js').config;

var spyfallConfig = Object.assign(prodConfig, {
  capabilities: {
    Host: {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    },
    Guest: {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    }
  },
  baseUrl: 'http://spyfall.crabhat.com/',
  specs: ['test/spyfall.js'],
    user: null,
    key: null,
    services: ['selenium-standalone']
});

exports.config = spyfallConfig;