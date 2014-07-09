'use strict'

var fs = require('fs');

var path = require('path');

module.exports = function(dirname, ext, callback) {
	//test dir is exist
	if(!fs.existsSync(dirname)) {
		return callback('The dir is not exist!');
	}

	if(Object.prototype.toString.call(callback) !== '[object Function]') {
		throw new TypeError('callback must a function');
	}

	fs.readdir(dirname, function(err, list) {

		if(err) {
			return callback(err);
		}

	    list = list.filter(function (file) {
	      return path.extname(file) === '.' + ext;
	    });

	    callback(null, list);

	});

}