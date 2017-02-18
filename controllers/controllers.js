
var restify = require('restify');
var mongoose = require('mongoose');
var restifyMongoose = require('restify-mongoose');
var jwt = require("jwt-simple");  
var models = require('../models');
const imdb = require('imdb-api');
var auth = require("../auth.js")();  
var cfg = require("../config.js");  


function movieController () {
 	var User = require('../models').User;
 	var Movie = require('../models').Movie;
	
// 	// Creating New Student
 	this.token = function (req, res) {
 		 if (req.body.username && req.body.password) {
         var username_ = req.body.username;
         var password_ = req.body.password;
         User.findOne({
             username: username_ ,password: password_
         }).then(function(user){
         	var payload = {
                 id: user.id
             };
             var token = jwt.encode(payload, cfg.jwtSecret);
             res.json({
                 token: token
             });
         }).catch(function(err){
         	res.send("go to /new_user");

         });

     } else {
         res.sendStatus(401);
     }
 	};

//   // Fetching Details of Student
  this.new_user = function (req, res) {

   if (req.body.username && req.body.password) {
        var username_ = req.body.username;
        var password_ = req.body.password;

        var new_user = new User({
        	username: username_,
        	password: password_
        });
        new_user.save(function (err) {
		  if (err) {
				return err;
		  }
		  else {
		  	res.send("go to /token");
		  }
		  });

    }else{
    	res.sendStatus(401);
    }
  };


  this.ok = function (req, res) {

  res.json("ok");
  };

  this.search = function (req, res,next) {
  	var req_body_json = JSON.parse(req.body);
	imdb.get(req_body_json.name).then(function(movie){
	// checking if movie found in our db
	console.log(movie.title);
	Movie.find({title: movie.title}).then(function(found){

			//Movie is found
			if(found[0] != null){
				console.log(found[0].title);
				Movie.update({title: movie.title},{comment: req_body_json.comment , rate: req_body_json.rate},function(err,movie){
					if(err){
						console.log(err);
						return err;
					}else{
						console.log("update");
					}

				})
				res.send("found");
			}else{
				//Movie Insertion
				var new_movie = new Movie({
					title: movie.title,
					descreption: movie.plot,
					director: movie.director,
					trailer: "url",
					comment: req_body_json.comment,
					rate: req_body_json.rate,
					actors: movie.actors
				});
				new_movie.save(function (err) {
				  if (err) {
						return err;
				  }
				  else {
				  	console.log("insert");
				  }
				res.send("insert");
			});
			}
			
			
	}).catch(function(err){
		//Movie is not found
	

		// req_body_json.descreption = movie.plot ;
		// req_body_json.trailer = "gfg";
		// req_body_json.actors = movie.actors;
		// req_body_json.title = movie.title;
		// req_body_json.director = movie.director;
		// movies.insert();
		//Movie Insertion
		var new_movie = new Movie({
			title: movie.title,
			descreption: movie.plot,
			director: movie.director,
			trailer: "url",
			comment: req_body_json.comment,
			rate: req_body_json.rate,
			actors: movie.actors
		});
		new_movie.save(function (err) {
		  if (err) {
				return err;
		  }
		  else {
		  	console.log("insert");
		  }
		  });
		res.send("insert");
	});
	
}).catch(function (err) {
    console.log(err);
    res.send("not found");

  
  });

};




return this;

};

module.exports = new movieController();