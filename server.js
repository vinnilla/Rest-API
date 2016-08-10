var express = require('express');
var app = express();
var path = require('path');
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');

// import custom middleware
var middleware = require('./middleware');

var todos = [
	{
		id: 1,
		description: "Teach REST API",
		completed: false
	},
	{
		id: 2,
		description: "Go eat a healthy lunch",
		completed: true
	}
]

// use middleware you want for the whole app
app.use(middleware.requireAuthentication);
app.use(bodyParser());

app.get('/', function(req, res) {
	res.send('<h1>Express ToDo API</h1>')
})

app.get('/todos', function(req, res) {
	res.json(todos);
})

app.get('/about', middleware.logger, function(req, res) {
	res.send('<h1>About</h1>');
})

app.listen(PORT, function() {
	console.log(`listening on port ${PORT}`);
})