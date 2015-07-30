import Ractive from 'ractive';

if ( window.component ) {
	load();
}

window.load = load;

function load() {
	const Component = makeComponent();

	if ( !Component ) { return; }

	new Component({
		el: document.body,
		data: component.data
	});
}

function getData() {
	if ( !component.data ) {
		return {};
	}

	// bit of a hack to supress Ractive warnings
	// because our data object was made in the
	// main window, not the iframe
	if ( data.constructor !== Object ) {
		data.constructor = Object;
	}
}

function makeComponent() {
	const c = component.script;
	if ( component.template ) {
		c.template = component.template;
	}
	c.css = component.style;

	return Ractive.extend( c );
}
