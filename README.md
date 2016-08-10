# Express To-Do API

heroku link:
https://limitless-woodland-75632.herokuapp.com


### Create node app
npm init --yes;

touch .gitignore;

touch server.js;
###### in package.json
change to main: server.js

### Create express app
npm i express -S
###### in server.js
```javascript
var express = require('express');
var app = express();
```

### Custom middleware
middleware is responsible for running functions before specific route functions are ran

useful for authentication and body parsing

middleware can be used globally before every route function or specifically for certain routes
###### in server.js
```javascript
var middleware = {define functions in here}
// globally:
app.use(middleware.functionName)
// specific:
app.get('/', middleware.functionName, callback)
```

### modulizing code
modulizing code is important to keep the main server.js file clean and easy to read
###### touch middleware.js
move custom middleware into that new file (export the variable so its usuable)
###### in server.js
```javascript
var middleware = require('./middleware');
```

### install and require module
npm i -S body-parser
###### in server.js
```javascript
var bodyParser = require('body-parser')
// since this is middleware that we want to run globally:
app.use(bodyParser());
```

### Set Postman up with collections and environments
set environment key apiURL to appropriate value

change routes to {{apiURL}}/desired_path

### GET todos/:id
save req.params.id as variable

loop through array of todos and find match between req.params.id and todo.id

if match exists, output json, else send error
```javascript
app.get('/todos/:id', function(req, res) {
	// res.send("Asking for todo with id " + req.params.id)
	var todoId = parseInt(req.params.id);
	var matchedTodo;
	// find todo with matching id
	todos.forEach(function(todo) {
		if(todoId == todo.id) {
			matchedTodo = todo;
		}
	})
		if (matchedTodo) {
			res.json(matchedTodo);
		}
		else {
			res.send(404);
		}
})
```

### POST todos
save req.body

increment id relative to ids already existing in the array of todos

push new todo into array
```javascript
app.post('/todos', function(req, res) {
	var body = req.body;
	// add id field
	body.id = todos[todos.length-1].id+1;
	todos.push(body);
	res.json(todos);
})
```
