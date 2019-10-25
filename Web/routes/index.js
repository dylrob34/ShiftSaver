var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //for dev
  //res.render('index', { title: 'Shift Saver' });
  //for React
  res.set("Access-Control-Allow-Origin", "https://localhost:3000");
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = router;
