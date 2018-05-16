const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user-model');
const Question = require('../models/question-model');
const slugify = require('slugify');
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
  res.render('kweeni', { 
    username: req.user.username,
    picture: req.user.picture
  });
});

// GET messege details page with the user id
router.get('/:question', function(req, res, next) {
  Question.findOne({slug: req.params.question}).populate('author').exec(function(err, question) {
    if(err) {
      console.log(err);
      res.send("404");
    } else {
      console.log("author = "+question.author.username);
      res.render('kweeni-details', {
        username: req.user.username,
        userPicture: req.user.picture,
        question: '"'+question.question+'"',
        postername: question.author.username,
        posterPicture: question.author.picture
      });
    }
  });
});

// POST method route=
router.post('/', (req, res) => {
  var username = req.user.username;
  var slugQuestion = slugify(req.body.question, {
    replacement: '-',
    remove: null,
    lower: true
  });
  var question = new Question({
    question: req.body.question,
    author: req.user.id,
    slug: slugQuestion,
    likes: 0
  });
  question.save(function (err) {
    Question.findOne({}).populate('author').exec(function (err, question) {
    if (err) console.log(err);
  });
});
  res.redirect('/kweeni/' + slugQuestion)
});

module.exports = router;
