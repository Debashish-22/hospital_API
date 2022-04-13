// Passport-jwt configuration

const env = require('../config/environment');
const passport = require('passport');
const Doctor = require('../models/doctor');
const res = require('express/lib/response');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = env.jwt_secret;

passport.use(new JwtStrategy(opts, async(jwt_payload, done) => {

    try{
        // finding user from JWT payload using token provided in header
        let user = await Doctor.findById(jwt_payload.id);

        if(!user){
            return done(null, false);
        }
        
        return done(null, user);
    }
    catch(err){

        done(err, false);
        return res.json({
            message: "Error in passport jwt authorization",
            error: err
        })
    }
}));

module.exports = passport