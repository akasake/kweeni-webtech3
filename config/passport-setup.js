const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new FacebookStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: "/auth/facebook/redirect"
      },
      function(accessToken, refreshToken, profile, cb) {
        console.log(profile);
      }
    )
    /*
    new FacebookStrategy({
        // options for the google strategy
        callbackURL: '/auth/facebook/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        // passport callback function
        // check if user already exists in our db
        /*User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser) {
                // already have the user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not create user in our db
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then((newUser) => {
                    console.log('new user created: ' + newUser);
                    done(null, newUser);
                });
            }
        });
    })*/
)