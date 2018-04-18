exports.kickstart = function(server) {
    const Primus = require('primus');
    let primus = new Primus(server, {});

    primus.on('connection', function(spark) {
        // primus.emit -> alle connecties
        // spark.emit -> een connectie
        console.log("Spark connected");
        spark.on('data', function(data) {
            primus.write(data);
        });
    });
} // 2 primus