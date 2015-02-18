var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
	res.render('index');
});

app.post('/next1', function(req, res){
  res.render('canary-islands');
});

app.post('/next2', function(req, res){
  res.render('cape-verde');
});

app.post('/next3', function(req,res) {
   res.render('strait-of-magellan');
});
 
app.post('/next4', function(req,res) {
  res.render('guam');
});

app.post('/next5', function(req,res) {
  res.render('philippines');
});

var locationArray = [
  "Serville",
  "Canary Islands",
  "Cape Verde",
  "Strait of Magellan",
  "Guam",
  "Philippines"
];


app.get('/next', function(req, res) {
  var locationStr = req.query.location;

  for (var i=0; i<locationArray.length; i++) {
    if (locationStr === locationArray[i]) {
      var locationObj = {
        location: locationStr, 
        nextLocation: locationArray[i+1]
      };
      break;
    }
  }

  res.send(JSON.stringify(locationObj));
});

app.get('/:name', function(req, res){
  var nameStr = req.params.name;
  res.status(404).render('notfound', {
    country:nameStr
  });
});

var server = app.listen(9568, function() {
	console.log('Express server listening on port ' + server.address().port);
});
