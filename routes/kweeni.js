const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user-model');
const Question = require('../models/question-model');
const slugify = require('slugify')
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
  Question.find({}).
  populate('author').
  exec(function(err, question) {
    if(err) {
      res.send("404");
    } else {
      res.render('kweeni', { 
        username: req.user.username,
        userId: req.user.id,
        picture: req.user.picture,
        questions: question
      });
    }
  });
});

// GET messege details page with the user id
router.get('/:question', function(req, res, next) {
  Question.findOne({slug: req.params.question}).
  populate('author').
  populate('comment.postedBy').
  populate('comment.subComments.postedBy').
  populate('likes.likedBy').
  exec(function (err, question) {
    if(err) { 
      res.send("404");
    } else {
      res.render('kweeni-details', { 
        username: req.user.username,
        userId: req.user.id,
        picture: req.user.picture,
        question: question.question,
        authorName: question.author.username,
        authorPicture: question.author.picture,
        questionId: question.id,
        comments: question.comment,
        answerCounter: 1,
        likes: question.likes,
        likesCount: question.likes.length,
        date: question.date
    });
  }
});
});

// POST method route=
router.post('/', (req, res) => {
  var username = req.user.username;
  var question = new Question({
    question: req.body.question,
    slug: slugify(req.body.question, {
      replacement: '-',    // replace spaces with replacement
      remove: null,        // regex to remove characters
      lower: true          // result in lower case
    }),
    date: Date.now(),
    likes: [],
    author: req.user.id,
    comment: []
  });
  question.save(function (err) {
    Question.findOne({}).
    populate('author').
    exec(function (err, question) {
      if (err) console.log(err);
    });
  });
  res.redirect('/kweeni/' + slugify(req.body.question, {
    replacement: '-',    // replace spaces with replacement
    remove: null,        // regex to remove characters
    lower: true          // result in lower case
  }))
});

module.exports = router;
