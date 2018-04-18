const express = require('express');
const router = express.Router();
const Question = require('./../models/question');

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
router.post('/', function(req,res){
  console.log("HIER");
  let q = new Question();
  q.title = req.body.question;
  q.author = "tijdelijk";
  q.save(function(err, doc){
    console.log("Hey!")
    res.json(doc);
  });
});

module.exports = router;
