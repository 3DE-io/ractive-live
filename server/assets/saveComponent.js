import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

export default function ( directory, changes, cb ) {
	const name = path.basename( directory ),
		  keys = Object.keys( changes );
	let count = keys.length;

	if ( !keys.length ) { return cb(); }

	mkdirp( directory, () => {
		keys.forEach( ext => {
			const fileName = path.join( directory, `${name}.${ext}` );
			fs.writeFile( fileName, changes[ext], err => {
				if ( err ) { return cb( err ); }
				if ( !(--count) ) {
					cb();
				}
			});
		});
	})


}

