const User = require('../models/user-model');
const Comment = require('../models/question-model');

exports.kickstart = function(server) {
    const Primus = require('primus');
    let primus = new Primus(server, {});

    primus.on('connection', function(spark) {
        console.log("Spark connected");
        spark.on('data', function(data) {
            primus.write(data);
            var comment = new Comment({
                comment: data.body,
                subComments: [],
                postedBy: "5ae602436f30722330468896"
              });
              comment.save(function (err) {
                Comment.findOne({}).
                populate('postedBy').
                exec(function (err, comment) {
                  if (err) console.log(err);
                });
              });
        });
    });
} // 2 primus