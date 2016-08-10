var express = require('express');
var app = express();
var path = require('path');
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var _ = require('lodash');

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

app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id);
	var matchedTodo = _.find(todos, {id: todoId});
	if (matchedTodo) {
		res.json(matchedTodo);
	}
	else {
		res.status(404).send(404);
		res.send(`Todo with id ${todoId} not found`);
	}
})

app.post('/todos', function(req, res) {
	var body = _.pick(req.body, ['description', 'completed']);
	// validate data types
	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send(400);
	}	
	body.description = body.description.trim();
	// add id field
	body.id = todos[todos.length-1].id+1;
	todos.push(body);
	res.json(todos);
})

app.get('/about', middleware.logger, function(req, res) {
	res.send('<h1>About</h1>');
})

app.listen(PORT, function() {
	console.log(`listening on port ${PORT}`);
})