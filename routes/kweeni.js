const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user-model');
const Question = require('../models/question-model');
const router = express.Router();
/*
const authCheck = (req, res, next) => {
  if(!req.user) {
    // if user is not logged in
    res.redirect('/');
  } else {
    // if logged in
    next();
  }
};*/

/* GET messages page. */
router.get('/', /*authCheck,*/ (req, res, next) => {
  res.render('kweeni', { 
    //username: req.user.username,
    //picture: req.user.picture
  });
});

// POST method route=
router.post('/', (req, res) => {
  /*var username = req.user.username;
  var question = new Question({
    question: req.body.question,
    author: req.user.id
  });
  question.save(function (err) {
    Question.find({}).populate('author')
    if (err) console.log(err);
  });*/
  res.redirect('/kweeni/test' /*req.user.id*/)
});

module.exports = router;