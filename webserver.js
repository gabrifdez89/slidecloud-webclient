var connect = require('connect'),
	serveStatic = require('serve-static');

connect().use(serveStatic(__dirname)).listen();

console.log('Listening...');