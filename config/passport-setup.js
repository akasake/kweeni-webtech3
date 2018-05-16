const passport = require('passport');
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
        // options for the facebook strategy
        callbackURL: 'https://45652802.ngrok.io/auth/facebook/redirect',
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecret,
        profileFields:['id','displayName','emails', 'picture.type(large)']
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
                new User({
                    facebookId: profile.id,
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    picture: profile.photos ? profile.photos[0].value : '/img/faces/unknown-user-pic.jpg'
                }).save().then((newUser) => {
                    console.log('new user created: ' + newUser);
                    done(null, newUser);
                });
            }
        });
    })
)