import express from 'express';
import bodyparser from 'body-parser';
import path from 'path';
import getComponent from './getComponent';
import saveComponent from './saveComponent';

const app = express(),
	  port = 3333,
	  root = process.argv[2] || process.cwd(),
	  compDir = path.join( root, 'assets', 'components' );


app.use( bodyparser.json() );
app.use( bodyparser.urlencoded( { extended: true } ) );

app.use(function(req, res, next) {
	res.header( 'Access-Control-Allow-Origin', '*' );
	res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );
	next();
});

app.listen(port, function() {
  console.log('app server started on port', port, 'serving components from', compDir);
});

app.get( '/favicon.ico', ( req, res ) => {
	res.end();
});

app.get( '*', ( req, res ) => {
	if ( req.url === '/' ) {
		res.status(500).send( 'component path not specified' );
		return;
	}
	getComponent( path.join( compDir, req.url ), ( err, files ) => {
		if ( err ) {
			res.status(500).send( err );
		}
		else {
			res.json( files );
		}
	});
});

app.post( '*', function( req, res ) {
	if ( req.url === '/' ) {
		res.status(500).send( 'component path not specified' );
		return;
	}
	saveComponent( path.join( compDir, req.url ), ( err ) => {
		if ( err ) {
			res.status(500).send( err );
		}
		else {
			res.sendStatus(200);
		}
	});
});
