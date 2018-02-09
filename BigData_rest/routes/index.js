var express = require('express');
var router = express.Router();

router.use('/api/data',require('../model/data').router);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'API' });
});

module.exports = router;
