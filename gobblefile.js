var gobble = require( 'gobble' ),
	lnp = require( 'list-npm-paths' ).sync,
	root, styles, ractive_components, app;

root = gobble( 'src/root' );

styles = gobble( 'src/scss' )
	.transform( 'sass', { src: 'main.scss', dest: 'min.css' });

vendor = gobble( 'node_modules', { static: true });

app = gobble([
	gobble( 'src/js' ).map( 'esperanto', { type: 'cjs', defaultOnly: true }),
	gobble( 'src/ractive_components' ).map( 'ractive', { type: 'cjs' }).moveTo( 'ractive_components')
]).map( 'es6-transpiler', {
	globals: { define: true }
});

app = app.transform( 'browserify', {
	entries: './app',
	dest: 'app.js'
});

module.exports = gobble([ root, styles, app ], { id: 'result' });
