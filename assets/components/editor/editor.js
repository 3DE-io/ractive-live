// const modes = ace.require('ace/ext/modelist')

import ace from 'brace';
import javascriptMode from 'brace/mode/javascript';
import htmlMode from 'brace/mode/html';
import handlebarsMode from 'brace/mode/handlebars';
import scssMode from 'brace/mode/scss';
import cssMode from 'brace/mode/css';
import theme from 'brace/theme/merbivore_soft';

const config = {
    "theme": "ace/theme/merbivore_soft",
    "gutter": true,
    "tab": 4,
    "softTab": false,
    "highlightLine": false,
    "invisibles": false,
    "indentGuides": true,
    "fadeFold": true,
    "scrollPastEnd": true
}

component.exports = {

    data () {
        return {
            config,
            content: null,
            error: null
        };
    },

    onrender: function(){
        this.editor = this.createEditor( this.find( '.editor' ) );
        setInterval( this.editor.resize, 1000 );
    },

    reset: function(){
        if(!this.editor) { return }
        this.editor.reset()
    },

    onteardown: function(){
        if(this.editor) {
            this.editor.teardown();
        }
    },

    createEditor: function ( node ){
        var e = ace.edit( node ),
            s = e.getSession(),
            setting, getting,
            ractive = this;

        e.$blockScrolling = Infinity;

        this.observe( 'content.mode', ( mode ) => {
            s.setMode( 'ace/mode/' + mode );
        });

        this.observe( 'content.code', code => {
            if( !getting ) {
                setting = true;
                e.setValue( code );
                e.clearSelection();
                setting = false;
            }

            this.setResult( code );
        });

        e.on( 'change', () => {
            if( setting ) return;
            getting = true;
            this.set( 'content.code', e.getValue() );
            getting = false;
        })

        //TODO: clean this block up nice and tidy
        this.observe('config.theme', function(t){
            e.setTheme(t)
        })
        this.observe('config.tab', function(i){
            s.setTabSize(i)
        })
        this.observe('config.gutter', b => {
            e.renderer.setShowGutter(b)
        })
        this.observe('config.softTab', b => {
            s.setUseSoftTabs(b)
        })
        this.observe('config.highlightLine', b => {
            e.setHighlightActiveLine(b);
        })
        this.observe('config.invisibles', b => {
            e.setShowInvisibles(b);
        })
        this.observe('config.indentGuides', b => {
            e.setDisplayIndentGuides(b);
        })
        this.observe('config.fadeFold', b => {
            e.setDisplayIndentGuides(b);
        })
        this.observe('config.scrollPastEnd', b => {
            e.setOption("scrollPastEnd", b);
        })

        resize();

        function resize(){
            e.resize();
        }
        function teardown(){
            e.destroy();
        }
        function reset(){
            //ace bug: https://github.com/ajaxorg/ace/issues/1243
            //s.getUndoManager().reset() doesn't work
            setting = true;
            s.setValue(e.getValue(), -1);
            e.clearSelection();
            setting = false;
        }

        return {
            teardown: teardown,
            resize: resize,
            reset: reset
        }
    },

    setResult ( code ) {
        const transform = this.get( 'content.preprocess' );
        let result;
        if ( !transform ) { result = code; }
        else {
            try {
                result = transform( code );
            }
            catch ( err ) {
                this.set( 'error', err );
                return;
            }
        }

        this.set({
            'content.result': result,
            error: null
        });
    }
}
