const express = require('express');
const User = require('../models/user-model');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, users) {
    if(err) {
      res.send("404");
    } else {
      res.render('index', { 
        user1: users[0].picture
        // user1: users[0].picture
      });
    }
  });
  res.render('index');
});

module.exports = router;
