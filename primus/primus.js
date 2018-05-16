const User = require('../models/user-model');
const Question = require('../models/question-model');
const mongoose = require('mongoose');
var Primus = require('primus');
var Rooms = require('primus-rooms');
var server = require('http').createServer();

exports.kickstart = function(server) {
    const Primus = require('primus');
    let primus = new Primus(server, { transformer: 'websockets' });

    // add rooms to Primus
    primus.plugin('rooms', Rooms);

    primus.on('connection', function(spark) {
        console.log("Spark connected");
        // get room from url
        var room = spark.query.room;
        // check if spark is already in this room
        if (~spark.rooms().indexOf(room)) {
            send();
        } else {
            // join the room
            spark.join(room, function(){
            send();
            });
        }
        
        // send to the user in the room
        function send() {
            spark.on('data', function(data) {
                    // basic frontend info doorsturen naar frontend
                    User.findOne({ _id: data.userId }, function (err, user) {
                        data.username = user.username;
                        data.userPicture = user.picture;
                        Question.findOne({ _id: data.questionId }, function (err, question) {
                            data.likesCount = question.likes.length+1;
                            spark.room(room).write(data);
                        });
                    });

                    // backend info doorsturen naar database
                    if(data.btn) {
                       // run dit als comment button wordt ingedrukt
                       Question.findById({ _id: data.questionId }, function (err, comment) {
                            if (err) console.log(err);
                            comment.comment.push({
                                comment: data.comment,
                                subComments: [],
                                postedBy: data.userId
                            });
                            comment.save();
                        });

                    } else if(data.like) {
                       // run dit als like wordt gedurkt
                       Question.findById({ _id: data.questionId }, function (err, like) {
                        if (err) console.log(err);

                        var alreadyLiked = false;
                        for (let i = 0; i < like.likes.length; i++) {
                            if(like.likes[i].likedBy == data.userId) {
                                alreadyLiked = true;
                            }
                        }
                        if(alreadyLiked == false) {
                            like.likes.push({
                                likedBy: data.userId,
                            });
                            like.save();
                        }
                    });

                    } else {
                       // run dit als het een subcomment is
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
        }
    });
} // 2 primus
