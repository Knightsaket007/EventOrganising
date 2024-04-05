var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

 res.render('signin',{ })

 
});

module.exports = router;

router.get('/T&C', function(req, res, next) {

    res.render('term-condition',{ })
   
    
   });
   module.exports = router;





