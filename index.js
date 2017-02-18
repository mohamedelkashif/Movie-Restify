'use strict';

var restify = require('restify');
var mongoose = require('mongoose');
var restifyMongoose = require('restify-mongoose');
var jwt = require("jwt-simple");  
var models = require('./models');
const imdb = require('imdb-api');
var auth = require("./auth.js")();  
var cfg = require("./config.js");  

mongoose.connect('mongodb://localhost/moviesrestify');

var server = restify.createServer({
  name: 'restify.mongoose.movies',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(auth.initialize());



var movies = restifyMongoose(models.Movie);
var users = restifyMongoose(models.User);


// Serve model Movie as a REST API
restifyMongoose(models.Movie).serve('/api/movies', server);





server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url);
});

var routes = require('./routes')(server);
