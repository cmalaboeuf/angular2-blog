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
var nconf = require('nconf');

var mongoose = require('mongoose');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./config/'+ process.env.NODE_ENV + '.json');

let options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};


mongoose.connect(config.database,options);

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
  res.json({ 'apiversion': 'v1' });
});
app.use('/api/v1', api);

var api_auth = require('./routes/api_auth');
app.use('/api', api_auth);


let server = app.listen(config.nodePort, ()=> {
  winston.log('App Started on PORT' + config.nodePort );
});

module.exports = {
  app,
  server
};