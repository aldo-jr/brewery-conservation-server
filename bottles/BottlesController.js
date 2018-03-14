var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));

// RETURNS ALL INFORMATIONS FOR ALL BOTTLES
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.options('/infos', function(req, res) {
  var headers = {};
  headers['Access-Control-Allow-Origin'] = '*';
  headers['Access-Control-Allow-Headers'] = 'Content-Type, x-access-token, Content-Length, Authorization, Accept, X-Requested-With';
  headers['Access-Contrl-Allow-Methods'] = 'GET, OPTIONS';
  headers["Access-Control-Max-Age"] = '86400';
  res.writeHead(200, headers);

  res.status(200).end();
});


router.get('/infos', VerifyToken, function (req, res) {
  var infos = [
    {
      "bottle": "1",
      "type":"Pilsner",
      "minimum_temp":"-6",
      "maximum_temp":"-4",
      "current_temp":getRandomInt(-7,-3)
    },
    {
      "bottle": "2",
      "type":"IPA",
      "minimum_temp":"-6",
      "maximum_temp":"-5",
      "current_temp":getRandomInt(-7,-4)
    },
    {
      "bottle": "3",
      "type":"Lager",
      "minimum_temp":"-7",
      "maximum_temp":"-4",
      "current_temp":getRandomInt(-8,-3)
    },
    {
      "bottle": "4",
      "type":"Stout",
      "minimum_temp":"-8",
      "maximum_temp":"-6",
      "current_temp":getRandomInt(-9,-5)
    },
    {
      "bottle": "5",
      "type":"Wheat beer",
      "minimum_temp":"-5",
      "maximum_temp":"-3",
      "current_temp":getRandomInt(-6,-2)
    },
    {
      "bottle": "6",
      "type":"Pale Ale",
      "minimum_temp":"-6",
      "maximum_temp":"-4",
      "current_temp":getRandomInt(-7,-3)
    }
  ]
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  res.json(infos);
});

router.get('/getinfos', function (req, res) {
  var infos = [
    {
      "bottle": "1",
      "type":"Pilsner",
      "minimum_temp":"-6",
      "maximum_temp":"-4",
      "current_temp":getRandomInt(-7,-3)
    },
    {
      "bottle": "2",
      "type":"IPA",
      "minimum_temp":"-6",
      "maximum_temp":"-5",
      "current_temp":getRandomInt(-7,-4)
    },
    {
      "bottle": "3",
      "type":"Lager",
      "minimum_temp":"-7",
      "maximum_temp":"-4",
      "current_temp":getRandomInt(-8,-3)
    },
    {
      "bottle": "4",
      "type":"Stout",
      "minimum_temp":"-8",
      "maximum_temp":"-6",
      "current_temp":getRandomInt(-9,-5)
    },
    {
      "bottle": "5",
      "type":"Wheat beer",
      "minimum_temp":"-5",
      "maximum_temp":"-3",
      "current_temp":getRandomInt(-6,-2)
    },
    {
      "bottle": "6",
      "type":"Pale Ale",
      "minimum_temp":"-6",
      "maximum_temp":"-4",
      "current_temp":getRandomInt(-7,-3)
    }
  ];
  res.header("Access-Control-Allow-Origin", "*");
  res;header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  res.json(infos);
});

module.exports = router;

