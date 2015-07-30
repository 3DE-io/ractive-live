'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

exports['default'] = function (directory, changes, cb) {
	var name = _path2['default'].basename(directory),
	    keys = Object.keys(changes);
	var count = keys.length;

	if (!keys.length) {
		return cb();
	}

	(0, _mkdirp2['default'])(directory, function () {
		keys.forEach(function (ext) {
			var fileName = _path2['default'].join(directory, name + '.' + ext);
			_fs2['default'].writeFile(fileName, changes[ext], function (err) {
				if (err) {
					return cb(err);
				}
				if (! --count) {
					cb();
				}
			});
		});
	});
};

module.exports = exports['default'];