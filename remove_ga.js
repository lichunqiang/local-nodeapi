#!/usr/bin/env node
'use strict'
var replace = require('replace');

var ls = require(__dirname + '/lib/ls.js');

var argv = require('minimist')(process.argv.slice(2));
var detectDir = argv._[0] || __dirname + '/node_apidoc';

var FILE_EXT = 'html';
var REG_SCRIPT = /<script.*?>[\s\S]*?<\/script>/ig;
var REG_IMG = /http:\/\/nodejs.org\/images\/logo-light.png/ig;


ls(detectDir, FILE_EXT, function(err, files) {

	if(err) {
		return console.log('ls error: ' + err);
	}
	files.forEach(function(_file, idx){
		files[idx] = detectDir + '/' + _file;
	});
	//replace scripts
	replace({
	  regex: REG_SCRIPT,
	  replacement: "",
	  paths: files,
	  recursive: true,
	  silent: true,
	});
	//replace imgage
	replace({
	  regex: REG_IMG,
	  replacement: "assets/logo-light.png",
	  paths: files,
	  recursive: true,
	  silent: true,
	});	
});	