var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shift Saver' });
});

router.post('/login', function(req, res, next) {
  console.log(req.body);
  js = {text:"hello!"}
  res.json(js);
});

module.exports = router;
