#!/usr/bin/env node
'use strict';
var os = require('os');
var open = require('opn');
var connect = require('connect');
var serveStatic = require('serve-static');
var argv = require('minimist')(process.argv.slice(2), {
  alias: {
    'port': 'p'
  },
  string: 'port',
  default: {
    'port': 8000
  }	
});

var chalk = require('chalk');
var pkg = require('./package.json');
var input = argv._[0];

var FILE_PATH = __dirname + '/node_apidoc/';

function help() {
	console.log([
		'',
		chalk.grey(pkg.description),
		'',
		chalk.green('Usage'),
		'  $ local-nodeapi',
		'  $ local-nodeapi -p8001',
		'',
	].join('\n'));
}

if(argv.h || argv.help) {
	return help();
}

if(argv.v || argv.V || argv.version) {
	return console.log(chalk.green(pkg.version));
}


/**
 * Get ip(v4) address
 * @return {String} the ipv4 address or 'localhost'
 */
var getIPAddress = function () {
  var ifaces = os.networkInterfaces();
  var ip = '';
  for (var dev in ifaces) {
    ifaces[dev].forEach(function (details) {
      if (ip === '' && details.family === 'IPv4' && !details.internal) {
        ip = details.address;
        return;
      }
    });
  }
  return ip || "127.0.0.1";
};

var setHeaders = function(res, path){
	res.setHeader("Access-Control-Allow-Origin", "*");
};

var app = connect();
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use(serveStatic(FILE_PATH, { 
	'index': '_toc.html',
	'setHeaders': setHeaders
}));
var port = argv.port || 8000

app.listen(port, function () {
  var url = "http://" + getIPAddress() + ":" + port;
  console.log(chalk.green("Running at ") + chalk.cyan(url));
  open(url);
});
