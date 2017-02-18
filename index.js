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

//User Login
// server.post("/token", function(req, res) {  
//     if (req.body.username && req.body.password) {
//         var username_ = req.body.username;
//         var password_ = req.body.password;
//         models.User.findOne({
//             username: username_ ,password: password_
//         }).then(function(user){
//         	var payload = {
//                 id: user.id
//             };
//             var token = jwt.encode(payload, cfg.jwtSecret);
//             res.json({
//                 token: token
//             });
//         }).catch(function(err){
//         	res.send("go to /new_user");

//         });

//     } else {
//         res.sendStatus(401);
//     }
// });
// register new user
// server.post("/new_user",function(req,res){
// 	if (req.body.username && req.body.password) {
//         var username_ = req.body.username;
//         var password_ = req.body.password;

//         var new_user = new models.User({
//         	username: username_,
//         	password: password_
//         });
//         new_user.save(function (err) {
// 		  if (err) {
// 				return err;
// 		  }
// 		  else {
// 		  	res.send("go to /token");
// 		  }
// 		  });

//     }else{
//     	res.sendStatus(401);
//     }
// })
// server.get("/ok", auth.authenticate(), function(req, res) {  
//     res.json("ok");
// });
//
var movies = restifyMongoose(models.Movie);
var users = restifyMongoose(models.User);

// Serve model movies as a REST API
// server.get('/movies', movies.query());
// server.get('/movies/:id', movies.detail());
// server.post('/movies', movies.insert());
// server.post('/users', users.insert());

// server.patch('/movies/:id', movies.update());
// server.del('/movies/:id', movies.remove());

// Serve model Movie as a REST API
restifyMongoose(models.Movie).serve('/api/movies', server);


// Search Movies
// server.post('/search',auth.authenticate(), function send(req, res, next){
// 	var req_body_json = JSON.parse(req.body);
// 	imdb.get(req_body_json.name).then(function(movie){
// 	// checking if movie found in our db
// 	console.log(movie.title);
// 	models.Movie.find({title: movie.title}).then(function(found){

// 			//Movie is found
// 			if(found[0] != null){
// 				console.log(found[0].title);
// 				models.Movie.update({title: movie.title},{comment: req_body_json.comment , rate: req_body_json.rate},function(err,movie){
// 					if(err){
// 						console.log(err);
// 						return err;
// 					}else{
// 						console.log("update");
// 					}

// 				})
// 				res.send("found");
// 			}else{
// 				//Movie Insertion
// 				var new_movie = new models.Movie({
// 					title: movie.title,
// 					descreption: movie.plot,
// 					director: movie.director,
// 					trailer: "url",
// 					comment: req_body_json.comment,
// 					rate: req_body_json.rate,
// 					actors: movie.actors
// 				});
// 				new_movie.save(function (err) {
// 				  if (err) {
// 						return err;
// 				  }
// 				  else {
// 				  	console.log("insert");
// 				  }
// 				res.send("insert");
// 			});
// 			}
			
			
// 	}).catch(function(err){
// 		//Movie is not found
	

// 		// req_body_json.descreption = movie.plot ;
// 		// req_body_json.trailer = "gfg";
// 		// req_body_json.actors = movie.actors;
// 		// req_body_json.title = movie.title;
// 		// req_body_json.director = movie.director;
// 		// movies.insert();
// 		//Movie Insertion
// 		var new_movie = new models.Movie({
// 			title: movie.title,
// 			descreption: movie.plot,
// 			director: movie.director,
// 			trailer: "url",
// 			comment: req_body_json.comment,
// 			rate: req_body_json.rate,
// 			actors: movie.actors
// 		});
// 		new_movie.save(function (err) {
// 		  if (err) {
// 				return err;
// 		  }
// 		  else {
// 		  	console.log("insert");
// 		  }
// 		  });
// 		res.send("insert");
// 	});
	
// }).catch(function (err) {
//     console.log(err);
//     res.send("not found");
// });
// });




server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url);
});

var routes = require('./routes')(server);
