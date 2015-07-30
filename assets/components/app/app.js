import request from 'superagent';
import Component from './Component';

const server = 'http://localhost:3333/';

function getPathFromHash() {
	return location.hash.replace( '#', '' );
}

component.exports = {

	data: {
		path: getPathFromHash() || ( location.hash = 'app' )
	},

	oninit () {

		window.onhashchange = () => {
			this.set( 'path', getPathFromHash() );
		};

		// location.hash = this.get( 'path' );

		this.observe( 'path', path => {
			if ( path ) {
				this.getComponent( this.get( 'path' ) );
			}
		})

		let changes;

		this.observe( 'component.*.code', ( code, old, k, content ) => {
			if ( code === old || ( !code && !old ) ) { return; }
			changes = changes || {};
			const ext = this.get( 'component' )[content].ext;
			changes[ ext ] = code;
		}, { init: false } );

		setInterval( () => {
			if ( !changes ) { return; }
			this.saveComponent( this.get( 'path' ), changes );
			changes = null;
		}, 1000);
	},

	getComponent ( path ) {

		request.get( server + path ).end( ( error, response ) => {
			let component = null;
			if ( !error ) {
				component = new Component( response.body );
			}
			this.set( { component, error } );
		});
	},

	saveComponent ( path, changes ) {
		request.post( server + path )
			.send( changes )
			.end( ( error, res ) => {
				if ( error ) {
					this.set( 'error', error.response.error.message );
				}
			});
	}
}
