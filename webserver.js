var connect = require('connect'),
	serveStatic = require('serve-static');

connect().use(serveStatic(__dirname)).listen(3030);

console.log('Listening on port 3030');