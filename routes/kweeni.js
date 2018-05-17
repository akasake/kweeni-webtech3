const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user-model');
const Question = require('../models/question-model');
const router = express.Router();
const slugify = require('slugify');

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
  Question.findOne({slug: req.params.question}, function(err, question) {
    if(err) {
      res.send("404");
    } else {
      res.render('kweeni-details', {
        username: req.user.username,
        picture: req.user.picture,
        question: '"'+question.question+'"'
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
    likes: 0,
  });
  question.save(function (err) {
    Question.find({}).populate('author')
    if (err) console.log(err);
  });
  res.redirect('/kweeni/' + slugQuestion)
});

module.exports = router;
