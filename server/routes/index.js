var express = require('express');
var router = express.Router();
const { APIError, HttpStatusCode,HTTP404Error } = require('../error/BaseError');

/* GET home page. */
router.get('/', function(req, res, next) {
  
//   setTimeout(function(){
    //  throw new HTTP404Error('asdf');
//     // throw err
// }, 1000)

  // throw new APIError('Not Found');
  res.render('index', { title: 'Express' });
});

module.exports = router;
