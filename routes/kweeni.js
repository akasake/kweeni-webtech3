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
  Question.find({}).populate('author').exec(function(err, question) {
    if(err) {
      res.send("404");
      console.log(err);
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
router.get('/:question', authCheck, function(req, res, next) {
  Question.findOne({slug: req.params.question}).populate('author').populate('comment.postedBy').populate('comment.subComments.postedBy').populate('likes.likedBy').exec(function (err, question) {
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


// When a new question is posted
router.post('/', (req, res) => {
  var username = req.user.username;
  // saving new question
  var question = new Question({
    question: req.body.question,
    author: req.user.id,
    // making url-able text
    slug: slugify(req.body.question, {
      replacement: '-',    // replace spaces with replacement -
      remove: null,        // regex to remove characters
      lower: true          // result in lower case
    }),
    date: Date.now(),
    likes: [], // init likes
    comment: [] // init comments
  });
  // save question in database
  question.save(function (err) {
    Question.findOne({}).populate('author').exec(function (err, question) {
      if (err) console.log(err);
    });
  });
  // redirects to question specific page with the 
  res.redirect('/kweeni/' + slugify(req.body.question, {
    replacement: '-',    // replace spaces with replacement -
    remove: null,        // regex to remove characters
    lower: true          // result in lower case
  }))
});


function dateNotation(date){
  var milliseconds = (Date.now()-date);
  var seconds = Math.floor(milliseconds/1000);
  var minutes = Math.floor(seconds/60);
  var hours = Math.floor(minutes/60);
  var days = Math.floor(hours/60);
  var weeks = Math.floor(days/7);
  var months = Math.floor(days/31);
  var years = Math.floor(days/365)

  if(years>0){
    var result = years+" jaar geleden"
  } else if(months>1){
    var result = months+" maanden geleden"
  } else if(months>0){
    var result = months+" maand geleden"
  } else if(weeks>1){
    var result = weeks+" weken geleden"
  } else if(weeks>0){
    var result = weeks+" week geleden"
  } else if(days>1){
    var result = days+" dagen geleden"
  } else if(days>0){
    var result = days +" dag geleden"
  } else if(hours>0){
    var result = hours+" uur geleden"
  } else if(minutes>1){
    var result = minutes+" minuten geleden"
  } else if(minutes>0){
    var result = minutes+" minuut geleden"
  } else if(seconds>0){
    var result = seconds+" seconden geleden"
  } else {
    var result = "zonet"
  }

  //return milliseconds+"ms "+seconds+"s "+minutes+"m "+hours+"h "+days+"d "+weeks+"weken "+months+"maanden "+years+"jaar";
  return result;
}


module.exports = router;
