const express = require('express');
const User = require('../models/user-model');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, users) {
    if(err) {
      res.send("404");
    } else {
      var userPictures = [];
      for (let i = 0; i < 10; i++) {
        if(users[i]) {
          userPictures[i] = users[i].picture;
        } else {
          userPictures[i] = "../images/user"+i+".png";
        }
      }
      res.render('index', { 
        user1: userPictures[0],
        user2: userPictures[1],
        user3: userPictures[2],
        user4: userPictures[3],
        user5: userPictures[4],
        user6: userPictures[5],
        user7: userPictures[6],
        user8: userPictures[7],
        user9: userPictures[8],
        user10: userPictures[9],
      });
    }
  });
});

module.exports = router;
