var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/messages', function(req, res) {
  // res.send('respond with a resource');
  console.log("SHOW SOME MASSAGES OR WHATEVER");
  res.end();
});


module.exports = router;
