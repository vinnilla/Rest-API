var express = require('express');
var app = express();
var path = require('path');
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var _ = require('lodash');

var routes = require('./router')

var DATABASE = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/express-todo';
var mongoose = require('mongoose');
mongoose.connect(DATABASE);

// import custom middleware
var middleware = require('./middleware');

// use middleware you want for the whole app
app.use(middleware.requireAuthentication);
app.use(bodyParser());

app.use('/', routes);

app.get('/', function(req, res) {
	res.send('<h1>Express ToDo API</h1>')
})

app.get('/about', middleware.logger, function(req, res) {
	res.send('<h1>About</h1>');
})

app.listen(PORT, function() {
	console.log(`listening on port ${PORT}`);
})