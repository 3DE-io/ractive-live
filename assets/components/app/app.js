import request from 'superagent';
import Content from './Content';

const server = 'http://localhost:3333/';

component.exports = {

	data: {
		path: 'app'
	},

	oninit () {
		this.getComponent( this.get( 'path' ) );

		let changes;

		this.observe( 'component.*.code', ( code, old, k, content ) => {
			changes = changes || {};
			changes[ content ] = code;
		}, { init: false } );

		// setInterval( () => {
		// 	if ( !changes ) { return; }
		// 	this.saveComponent( this.get( 'path' ), changes );
		// 	changes = null;
		// }, 1000);
	},

	getComponent ( path ) {

		request.get( server + path ).end( ( error, response ) => {
			let component = null;
			if ( !error ) {
				component = new Content( response.body );
			}
			this.set( { component, error } );
		});
	},

	saveComponent ( path, changes ) {
		request.post( server + path )
			.send( changes )
			.end( ( error, res ) => {
				this.set( 'error', error.response.error.message );
			});
	}
}
