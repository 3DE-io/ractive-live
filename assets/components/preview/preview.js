import Ractive from 'ractive';

component.exports = {
	onrender () {
		const preview = this.find('iframe').contentWindow;

		const component = this.get( 'component' );

		preview.component = {
			template: component.template.result,
			style: component.style.result,
			data: component.data.result,
			script: component.script.result
		};

		function setComponent ( value, property ) {
			const c = preview.component || ( preview.component = {} );
			c[ property ] = value;
			if ( preview.load ) {
				preview.load();
			}
		}

		this.observe( 'component.template.result', template => {
			setComponent( template, 'template' );
		}, { init: false } );

		this.observe( 'component.style.result', style => {
			setComponent( style, 'style' );
		}, { init: false } );

		this.observe( 'component.data.result', data => {
			setComponent( data, 'data' );
		}, { init: false } );

		this.observe( 'component.script.result', script => {
			setComponent( script, 'script' );
		}, { init: false } );
	}
}
