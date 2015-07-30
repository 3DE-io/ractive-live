import setup from './setup-ractive';
import App from './app';


// As of 0.7 default for debug is true
// Ractive.defaults.debug = false;

new App({
    el: document.body
});
