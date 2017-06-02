var express = require('express');
var redis = require('redis');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var cors = require('cors');
var client = redis.createClient();
var app = express();
var passport = require('passport');
var winston = require('winston');

var mongoose = require('mongoose');
mongoose.connect('mongodb://mongodb/myDatabase');


app.use(cors());
app.use(session({
  secret: 'ssshhhhh',
  // create new redis store.
  store: new redisStore({ host: 'redis', port: 6379, client: client, ttl: 260 }),
  saveUninitialized: false,
  resave: false
}));

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use('/api/v1/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  next();
});

var api = require('./routes/api');
app.get('/api', function (req, res) {
  res.json({ 'apiversion': 'v1' })
});
app.use('/api/v1', api);

var api_auth = require('./routes/api_auth');
app.use('/api', api_auth);


app.listen(8888, function () {
  winston.log('App Started on PORT 8888');
});