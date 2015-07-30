import fs from 'fs';
import path from 'path';

export default function ( directory, cb ) {

	const name = path.basename( directory );

	fs.readdir( directory, ( err, files ) => {
		if ( err ) {
			if ( err.code === 'ENOENT' ) {
				cb( null, {} );
			}
			else {
				cb( err );
			}
			return;
		}

		const results = {},
			  filesToGet = [],
			  extensions = [ 'html', 'scss', 'js', 'data' ];


		extensions.forEach( ext => {
			const fileName = `${name}.${ext}`;
			if ( ~files.indexOf( fileName ) ) {
				filesToGet.push({
					ext,
					path: path.join( directory, fileName )
				});
			}
		});

		if ( !filesToGet.length ) {
			return cb( null, {} );
		}

		let count = filesToGet.length;

		filesToGet.forEach( file => {
			fs.readFile( file.path, ( err, data ) => {
				if ( err ) { return cb( err ); }
				results[ file.ext ] = data.toString();

				if ( !(--count) ) {
					cb( null, results );
				}
			});
		});

	});
}

