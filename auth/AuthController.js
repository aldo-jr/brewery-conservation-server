var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config'); // get config file

router.options('/login', function (req, res) {
  var headers = {};
  headers['Access-Control-Allow-Origin'] = '*';
  headers['Access-Control-Allow-Headers'] = 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, x-access-token';
  headers['Access-Contrl-Allow-Methods'] = 'POST, OPTIONS';
  headers["Access-Control-Max-Age"] = '86400';
  res.writeHead(200, headers);

  res.status(200).end();
});

router.post('/login', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");

  if (req.body.email === "email@domain.com") {
    var passwordIsValid = bcrypt.compareSync(req.body.password, bcrypt.hashSync("123456", 8));
    if (!passwordIsValid) return res.status(401).send({auth: false, token: null, message: 'Wrong Password'});

    var token = jwt.sign({id: 1}, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({auth: true, token: token});
  } else {
    return res.status(404).send('No user found.');
  }
});

router.get('/logout', function (req, res) {
  res.status(200).send({auth: false, token: null});
});

router.options('/me', function (req, res) {
  var headers = {};
  headers['Access-Control-Allow-Origin'] = '*';
  headers['Access-Control-Allow-Headers'] = 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, x-access-token';
  headers['Access-Contrl-Allow-Methods'] = 'POST, OPTIONS';
  headers["Access-Control-Max-Age"] = '86400';
  res.writeHead(200, headers);

  res.status(200).end();
});

router.get('/me', VerifyToken, function (req, res) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");

  res.status(200).send(
    {
      "status": true,
      "attributes": {
        "name": "User Name",
        "email": "email@domain.com"
      }
    }
  );

});

module.exports = router;