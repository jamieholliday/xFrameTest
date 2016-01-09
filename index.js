#!/usr/bin/env node

var request = require('request');
var url = require('url');
var fs = require('fs');
var colors = require('colors/safe');
var urlParam = process.argv[2];

if (urlParam) {
  checkUrl(urlParam);
} else {
  console.log(colors.red('ERROR - must supply a url'))
}

function checkUrl(u) {
  var parsedUrl = url.parse(u);
  request({url: parsedUrl, method: 'HEAD'}, function(err, res) {
    if (err) {
      console.log(colors.red('There was an error: '), parsedUrl.host, ':', err.code);
      process.exit(1);
    } else if (!err && res.statusCode === 200) {
      var xframeOpts = res.headers['x-frame-options'];
      if(xframeOpts) {
        if(xframeOpts === 'SAMEORIGIN') {
          console.log(colors.red(u), ' - X-FRAME-ORIGINS:  ' + xframeOpts);
        } else {
          console.log(u, ' - X-FRAME-ORIGINS:  ' + xframeOpts);
        }
      } else {
        console.log(colors.green(u), ' - OK');
      }
      process.exit(0);
    }
  });
}
