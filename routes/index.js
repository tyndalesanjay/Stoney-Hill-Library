var express = require('express');
var router = express.Router();
var conn = require('../lib/db')

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Home'});
});

module.exports = router;
