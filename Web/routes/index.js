var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //for dev
  //res.render('index', { title: 'Shift Saver' });
  //for React
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

router.post('/login', function(req, res, next) {
  console.log(req.body);
  js = {text:"hello!"}
  res.json(js);
});

module.exports = router;
