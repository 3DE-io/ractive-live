'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

exports['default'] = function (directory, changes, cb) {
	return cb();
	var name = _path2['default'].basename(directory);

	_fs2['default'].readdir(directory, function (err, files) {
		if (err) {
			if (err.code === 'ENOENT') {
				cb(null, {});
			} else {
				cb(err);
			}
			return;
		}

		var results = {},
		    filesToGet = [],
		    extensions = ['html', 'scss', 'js', 'data'];

		extensions.forEach(function (ext) {
			var fileName = name + '.' + ext;
			if (~files.indexOf(fileName)) {
				filesToGet.push({
					ext: ext,
					path: _path2['default'].join(directory, fileName)
				});
			}
		});

		if (!filesToGet.length) {
			return cb(null, {});
		}

		var count = filesToGet.length;

		filesToGet.forEach(function (file) {
			_fs2['default'].readFile(file.path, function (err, data) {
				if (err) {
					return cb(err);
				}
				results[file.ext] = data.toString();

				if (! --count) {
					cb(null, results);
				}
			});
		});
	});
};

module.exports = exports['default'];