var express = require('express');
var app = express();

global.__root   = __dirname + '/';

app.get('/web', function (req, res) {
  res.status(200).send('API works.');
});

var AuthController = require(__root + 'auth/AuthController');
app.use('/web/auth', AuthController);

var BottlesController = require(__root + 'bottles/BottlesController');
app.use('/web/bottles', BottlesController);

module.exports = app;