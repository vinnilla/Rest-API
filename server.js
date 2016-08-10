var express = require('express');
var app = express();
var path = require('path');
var PORT = 3000;

// import custom middleware
var middleware = require('./middleware');

// use middleware you want for the whole app
app.use(middleware.requireAuthentication);

app.get('/', function(req, res) {
	res.send('<h1>Express ToDo API</h1>')
})

app.get('/about', middleware.logger, function(req, res) {
	res.send('<h1>About</h1>');
})

app.listen(PORT, function() {
	console.log(`listening on port ${PORT}`);
})