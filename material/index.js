var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 3000));
console.log('App running on port', (process.env.PORT || 3000));

app.get('/', function (req, res) {
  res.send('This is PlacesRec');
});
