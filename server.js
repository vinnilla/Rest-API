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
	if (!matchedTodo) {
		res.status(404).send(`Todo with id ${todoId} not found`);
	}
	else {
		res.json(matchedTodo);
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

app.delete('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id);
	var matchedTodo = _.find(todos, {id: todoId});
	if (!matchedTodo) {
		res.status(404).send(`Todo with id ${todoId} not found`);
	}
	else {
		todos = _.without(todos, matchedTodo);
		res.json(todos);
	}
})

app.patch('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id);
	var matchedTodo = _.find(todos, {id: todoId});
	var body = _.pick(req.body, ['description', 'completed']);
	var validAttributes = {};
	if (!matchedTodo) {
		return res.status(404).send(`Todo with id ${todoId} not found`);
	}
	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;
	}
	else {
		return res.status(400).send(`completed must be defined and be a boolean`);
	}
	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length != 0) {
		validAttributes.description = body.description.trim();
	}
	else {
		return res.status(400).send(`description must be defined and be a string containing more than whitespace`);
	}
	matchedTodo = _.extend(matchedTodo, validAttributes);
	res.json(matchedTodo);
})

app.get('/about', middleware.logger, function(req, res) {
	res.send('<h1>About</h1>');
})

app.listen(PORT, function() {
	console.log(`listening on port ${PORT}`);
})