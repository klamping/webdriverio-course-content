// require prod configuration
var prodConfig = require('./wdio.conf.js').config;

// clone prod config and add new properties/overrides
var localConfig = Object.assign(prodConfig, {
  capabilities: [{
    browserName: 'chrome'
  }],
  baseUrl: 'http://localhost:8303',
  services: ['selenium-standalone']
});

// delete any unwanted properties
delete localConfig.user;
delete localConfig.key;
delete localConfig.sauceConnect;

// log out just to see what's in it
console.log(localConfig);

exports.config = localConfig;