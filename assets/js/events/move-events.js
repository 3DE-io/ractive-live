import subscriber from './event-subscriber';

export default function MoveEvents(node, notify){
    var self = this,
        mouse = {
            start: 'mousedown',
            move: 'mousemove',
            end: 'mouseup',
            normalize: function current(e){
                return e
            }
        },
        touch = {
            start: 'touchstart',
            move: 'touchmove',
            end: 'touchend',
            normalize: function current(e){
                var t = e.touches[0]
                if(t){
                    e.x = t.pageX
                    e.y = t.pageY
                }
                return e
            }
        },
        events = void 0

    this.start = listen
    this.stop = stop
    this.start()

    function listen(){
        subscriber.add(node, mouse.start, onstart)
        subscriber.add(node, touch.start, onstart)
    }

    function endListen(){
        subscriber.remove(node, mouse.start, onstart)
        subscriber.remove(node, touch.start, onstart)
    }

    function onstart(e) {
        events = e.type===mouse.start ? mouse : touch

        var listenMove = true
        if(notify.start){
            var result = notify.start( events.normalize(e) )
            listenMove = !(result===false)
        }
        if(listenMove){
            endListen()
            subscriber.add(document, events.move, onmove)
            subscriber.add(document, events.end, onend)
            // subscriber.add(window.top, events.end, onend)
        }
    }

    function onmove(e) {
        if(notify.move){ notify.move( events.normalize(e) ) }
    }

    function onend(e) {
        endMove()
        if(notify.end){ notify.end( events.normalize(e) ) }
        self.start()
    }

    function endMove(){
        if(!events) { return; }
        subscriber.remove(document, events.move, onmove)
        subscriber.remove(document, events.end, onend)
        // subscriber.remove(window.top, events.end, onend)
    }

    function stop(){
        endListen()
        endMove()
    }
}
