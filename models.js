'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var util = require('util');

var MovieSchema = new Schema({
  title : { type : String, required : true },
  descreption : { type : String, required : true },
  director : { type : String, required : true },
  trailer : { type : String, required : true },
  comment : { type : String},
  rate:     {type : Number},
  actors : [String]
});




var UserSchema = new Schema({
  username : { type : String, required : true },
  password : { type : String, required : true }
  
});

MovieSchema.path('actors').set(function(val) {
  if (val === undefined) {
    return val;
  }

  if (util.isArray(val)) {
    return val;
  }

  return val.split(',');
});

var models = {
  Movie : mongoose.model('movies', MovieSchema),
   User : mongoose.model('users', UserSchema)

};

module.exports = models;
