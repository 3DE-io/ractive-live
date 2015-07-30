export default {
	add: function(target, event, fn){
	    target.addEventListener(event, fn, false)
	},
	remove: function(target, event, fn){
	    target.removeEventListener(event, fn, false)
	}
}
