/* Express configuration */
var express               = require('express');
var app                   = express();

/* Needed tools */
var path                  = require('path');


app.use('/js' , express.static(path.join(__dirname, '/public/assets/js')));
app.use('/css' , express.static(path.join(__dirname, '/public/assets/css')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(5555);