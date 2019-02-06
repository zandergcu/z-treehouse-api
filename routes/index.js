var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'API Practice',
    description: 'Treehouse profile API practice',
    url: 'https://z-treehouse-api.herokuapp.com/'
  });
});

module.exports = router;
