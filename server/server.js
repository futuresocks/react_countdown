var express = require('express');
var app = express();
var path = require('path');
var anagramica = require('anagramica');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/:letters', function (req, res) {
  var answers;
  anagramica.all(req.params.letters, (error, response) => {
    console.log(req.params.letters);
    console.log(response);
    res.json(response)
  })
});

var server = app.listen(3001, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
