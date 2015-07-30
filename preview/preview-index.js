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

	setCss( component.style );
}

let style;

function setCss( css ) {
	if ( !window.style ) {
		window.style = document.createElement( 'style' );
		window.style.type = 'text/css';
		document.head.appendChild( window.style );
	}

    window.style.innerHTML = css;
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

	return Ractive.extend( c );
}
