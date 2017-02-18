// auth.js
var passport = require("passport");  
var passportJWT = require("passport-jwt");  
var user_model = require("./models.js").User;  
var cfg = require("./config.js");  
var ExtractJwt = passportJWT.ExtractJwt;  
var Strategy = passportJWT.Strategy;  
var params = {  
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {  
    var strategy = new Strategy(params, function(payload, done) {
        var user = user_model.find({id: payload.id}).then(function(user){
        	return done(null, {
                id: user.id
            });
        }).catch(function(err){
        	return done(new Error("User not found"), null);
        });
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};