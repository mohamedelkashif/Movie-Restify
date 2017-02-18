var restify = require('restify');
var mongoose = require('mongoose');
var restifyMongoose = require('restify-mongoose');
var jwt = require("jwt-simple");  
var models = require('./models');
const imdb = require('imdb-api');
var auth = require("./auth.js")();  
var cfg = require("./config.js");  

module.exports = function(server) {
	var movies = restifyMongoose(models.Movie);
	var users = restifyMongoose(models.User);

	var moviecon = require('./controllers/controllers');

	

	server.get('/movies', movies.query());
server.get('/movies/:id', movies.detail());
server.post('/movies', movies.insert());
server.post('/users', users.insert());

server.patch('/movies/:id', movies.update());
server.del('/movies/:id', movies.remove());


server.post("/token", moviecon.token);
server.post("/new_user", moviecon.new_user);
server.post("/ok", moviecon.ok);
server.post("/search", moviecon.search);






 
};

// var server = restify.createServer({
//   name: 'restify.mongoose.movies',
//   version: '1.0.0'
// });

// var movies = restifyMongoose(models.Movie);
// var users = restifyMongoose(models.User);




