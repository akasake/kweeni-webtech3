var express = require('express');
var router = express.Router();

/* GET messege details page. */
router.get('/', function(req, res, next) {
  res.render('message-details', { title: 'Kweeni' });
});

module.exports = router;
