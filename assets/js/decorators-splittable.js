import MoveEvents from './events/track-move-events';

export default function splittable ( node, options = {} ) {

    const ractive = this,
          direction = {
              x: options.hasOwnProperty('x'),
              y: options.hasOwnProperty('y')
          },
          events = new MoveEvents(node, {
        	  start: start,
              move: move,
              end: end
          });

    let original, total, buffer;

    function start(){

        node.classList.add('moving');
        document.body.style.cursor = 'move';
        document.body.style.pointerEvents = 'none';

        const parent = node.parentNode;

        total = {
            x: parent.clientWidth,
            y: parent.clientHeight
        };

        buffer = {
            x: node.offsetWidth*.5/total.x,
            y: node.offsetHeight*.5/total.y
        };

        original = {
        	x: ractive.get( options.x ),
        	y: ractive.get( options.y )
        };
    }

    function move( delta ){
    	set( 'x', delta.x );
    	set( 'y', delta.y );
    }

    function set( axis, delta ) {

    	if ( !direction[ axis ] ) { return; }

    	let amount = original[ axis ] + ( delta / total[ axis ] * 100 );

    	const b = buffer[ axis ];
        amount = Math.max( amount, b );
        amount = Math.min( amount, 100 - b );

        ractive.set( options[ axis ], amount );
    }

    function end(){
        node.classList.remove('moving');
        document.body.style.pointerEvents = null;
        document.body.style.cursor = null;
    }

    return {
    	teardown: function () {
    		events.stop();
    	}
    }
}
