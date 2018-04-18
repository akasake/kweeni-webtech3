var express = require('express');
var router = express.Router();

const authCheck = (req, res, next) => {
  if(!req.user) {
    // if user is not logged in
    res.redirect('/');
  } else {
    // if logged in
    next();
  }
};

/* GET messege details page. */
router.get('/', authCheck, function(req, res, next) {
  res.render('message-details', {
    title: "kweeni",
    username: req.user.username,
    picture: req.user.picture
  });
});

module.exports = router;
