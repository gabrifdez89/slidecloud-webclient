var connect = require('connect'),
	serveStatic = require('serve-static');

connect().use(serveStatic(__dirname)).listen(process.env.PORT || 3030);

console.log('Listening...');