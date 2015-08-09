component.exports = {
	
	sayHello () {
		this.set( 'place', 'mars' );
	},
	
	addItem( newItem ) {
		this.push( 'items', this.get( 'newItem' ) );
		this.set( 'newItem' );
	},
	
	components: {
		item: Ractive.extend({
			template: 'The letter is {{letter}}'
		})
		
	}
	
};