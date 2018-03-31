var express = require('express');
var router = express.Router();

/* GET messages page. */
router.get('/', function(req, res, next) {
  res.render('messages', { title: 'Kweeni' });
  //res.send('respond with a resource');
});

module.exports = router;
