var express = require('express');
var router = express.Router();

const userRouter = require('./modules/user/routes');


router.get('/', function (req, res, next) {
  res.send('Hello v1.0 GET API from Yield Bank');
});

router.post('/', function (req, res, next) {
  res.send('Hello v1.0 POST API from Yield Bank');
});

router.use('/user', userRouter);


module.exports = router;
