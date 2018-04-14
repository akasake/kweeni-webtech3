const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const keys = require('./keys');
const User = require('../models/user-model');
/*
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});
*/
passport.use(
    new FacebookStrategy({
        // options for the google strategy
        callbackURL: 'https://kweeni.herokuapp.com/auth/facebook/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        // check if user already exists in our db
        User.findOne({facebookId: profile.id}).then((currentUser) => {
            if(currentUser) {
                // already have the user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not create user in our db
                ({
                    facebookId: profile.id,
                    firstName: profile.first_name,
                    lastName: profile.last_name
                }).save().then((newUser) => {
                    console.log('new user created: ' + newUser);
                    done(null, newUser);
                });
            }
        });
    })
)