var express = require('express');
var router = express.Router();
var sql = require('../config/db-config');
/* GET users listing. */
router.get('/', function(req, res, next) {
  sql.connect().then(()=>{
    var request = new sql.Request(sql);
    request.query('select * from test', function(err, recordset) {
      if (err) {
        console.error(err);
        res.status(500).send(err.message);
        return;
      }
      res.status(200).json(recordset);
    });
  }).catch(err=>{
    console.log(err)
  })
});

module.exports = router;
