var express = require('express');
var router = express.Router();
var _ = require('lodash');

var Todo = require('./todo_model');

var todos = [
	new Todo({
		description: "Teach REST API",
		completed: false
	}),
	new Todo({
		description: "Go eat a healthy lunch",
		completed: true
	})
]

router.get('/todos', function(req, res) {
	res.json(todos);
})

router.get('/todos/:id', function(req, res) {
	var matchedTodo = _.find(todos, {id: req.params.id});
	if (!matchedTodo) {
		res.status(404).send(`Todo with id ${req.params.id} not found`);
	}
	else {
		res.json(matchedTodo);
	}
})

router.post('/todos', function(req, res) {
	var body = _.pick(req.body, ['description', 'completed']);
	// validate data types
	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send(400);
	}	
	body.description = body.description.trim();
	todos.push(new Todo(body));
	res.json(todos);
})

router.delete('/todos/:id', function(req, res) {
	var matchedTodo = _.find(todos, {id: req.params.id});
	if (!matchedTodo) {
		res.status(404).send(`Todo with id ${req.params.id} not found`);
	}
	else {
		todos = _.without(todos, matchedTodo);
		res.json(todos);
	}
})

router.patch('/todos/:id', function(req, res) {
	var matchedTodo = _.find(todos, {id: req.params.id});
	var body = _.pick(req.body, ['description', 'completed']);
	var validAttributes = {};
	if (!matchedTodo) {
		return res.status(404).send(`Todo with id ${req.params.id} not found`);
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

module.exports = router;
