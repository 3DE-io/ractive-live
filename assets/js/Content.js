import Ractive from 'ractive';

export default class Component {

	constructor ( data ) {

		this.template = {
			code: data.html || '',
			mode: 'handlebars',
			preprocess: Ractive.parse,
			result: ''
		};

		this.style = {
			code: data.scss || '',
			mode: 'css',
			result: ''
		};

		this.data = {
			code: data.data || '',
			mode: 'javascript',
			preprocess: data => {
				return ( new Function(`return ${data};`) )();
			},
			result: ''
		};

		this.script = {
			code: data.js || 'component.exports = {\n\n};',
			mode: 'javascript',
			preprocess: js => {
				js = babel.transform( js ).code;
				const fn = new Function( 'component', 'Ractive', js ),
					  comp = {};

				fn( comp, Ractive );
				return comp.exports || {};
			},
			result: ''
		};

	}
}
