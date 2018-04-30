const User = require('../models/user-model');
const Question = require('../models/question-model');
const mongoose = require('mongoose');

exports.kickstart = function(server) {
    const Primus = require('primus');
    let primus = new Primus(server, {});

    primus.on('connection', function(spark) {
        console.log("Spark connected");
        spark.on('data', function(data) {
            User.findOne({ _id: data.userId }, function (err, user) {
                data.username = user.username;
                data.userPicture = user.picture;
                console.log(data);
                primus.write(data);
            })
            if(data.btn) {
                Question.findById({ _id: data.questionId }, function (err, comment) {
                    if (err) console.log(err);
                    comment.comment.push({
                        comment: data.comment,
                        subComments: [],
                        postedBy: data.userId
                    });
                    comment.save();
                });
            } else {
                Question.findById({ _id: data.questionId }, function (err, comment) {
                    if (err) console.log(err);
                    comment.comment[data.answerId - 1].subComments.push({
                        comment: data.subcomment,
                        postedBy: data.userId
                    });
                    comment.save();
                });
            }
        });
    });
} // 2 primus