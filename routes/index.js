var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.get('/updateBid', function(req, res, next) {
  res.render('updateBid.html');
});

router.get('/endBid', function(req, res, next) {
  res.render('endBid.html');
});

router.get('/deleteBid', function(req, res, next) {
  res.render('deleteBid.html');
});

module.exports = router;
