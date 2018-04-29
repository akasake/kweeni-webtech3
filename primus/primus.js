const User = require('../models/user-model');
const Question = require('../models/question-model');

exports.kickstart = function(server) {
    const Primus = require('primus');
    let primus = new Primus(server, {});

    primus.on('connection', function(spark) {
        console.log("Spark connected");
        spark.on('data', function(data) {
            primus.write(data);
        });
    });
} // 2 primus