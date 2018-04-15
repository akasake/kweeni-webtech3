const express = require('express');
const router = express.Router();

const authCheck = (req, res, next) => {
  if(!req.user) {
    // if user is not logged in
    res.redirect('/');
  } else {
    // if logged in
    next();
  }
};

/* GET messages page. */
router.get('/', authCheck, (req, res, next) => {
  res.render('messages', { 
    username: req.user.username,
    picture: req.user.picture
  });
});

module.exports = router;
