# Express To-Do API

### Create node app
npm init --yes;
touch .gitignore;
touch server.js;
###### in package.json
change to main: server.js

### Create express app
npm i express -S
###### in server.js
var express = require('express');
var app = express();

### Custom middleware
middleware is responsible for running functions before specific route functions are ran
useful for authentication and body parsing
middleware can be used globally before every route function or specifically for certain routes
###### in server.js
var middleware = {define functions in here}
####globally:
app.use(middleware.functionName)
####specific:
app.get('/', middleware.functionName, callback)

### modulizing code
modulizing code is important to keep the main server.js file clean and easy to read
###### touch middleware.js
and move custome middleware into that new file (export the variable so its usuable)
###### in server.js
var middleware = require('./middleware');