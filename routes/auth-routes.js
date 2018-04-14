const router = require('express').Router();
const passport = require('passport');

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout();
    res.redirect('/');
});

// auth with google
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['email']
}));

// callback route for google to redirect to
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/messages/');
});

module.exports = router;