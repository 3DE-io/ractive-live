'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _getComponent = require('./getComponent');

var _getComponent2 = _interopRequireDefault(_getComponent);

var _saveComponent = require('./saveComponent');

var _saveComponent2 = _interopRequireDefault(_saveComponent);

var app = (0, _express2['default'])(),
    port = 3333,
    root = process.argv[2] || process.cwd(),
    compDir = _path2['default'].join(root, 'assets', 'components');

app.use(_bodyParser2['default'].json());
app.use(_bodyParser2['default'].urlencoded({ extended: true }));

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.listen(port, function () {
	console.log('app server started on port', port, 'serving components from', compDir);
});

app.get('/favicon.ico', function (req, res) {
	res.end();
});

app.get('*', function (req, res) {
	if (req.url === '/') {
		res.status(500).send('component path not specified');
		return;
	}
	(0, _getComponent2['default'])(_path2['default'].join(compDir, req.url), function (err, files) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.json(files);
		}
	});
});

app.post('*', function (req, res) {
	if (req.url === '/') {
		res.status(500).send('component path not specified');
		return;
	}
	(0, _saveComponent2['default'])(_path2['default'].join(compDir, req.url), function (err) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.sendStatus(200);
		}
	});
});