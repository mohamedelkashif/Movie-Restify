const imdb = require('imdb-api');

imdb.get('gone girl').then(function(movie){

	console.log(movie);
	
}).catch(function (err) {
    //log.error(err);
    console.log("not found");
});