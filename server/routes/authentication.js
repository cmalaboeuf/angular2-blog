var User = require('../models/user');
var config = require('../config/'+ process.env.NODE_ENV + ".json")
var jwt = require('jwt-simple');

var auth = {
  authenticate: function (req, res) {
    User.findOne({
      email: req.body.email
    }, function (err, user) {
      if (err) throw err;

      if (!user) {
        res.status(403).send({ success: false, msg: 'Authentication failed, User not found' });
      }

      else {
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            var token = jwt.encode(user, config.secret);
            res.json({ success: true, token: token });
          } else {
            return res.status(403).send({ success: false, msg: 'Authenticaton failed, wrong password.' });
          }
        });
      }
    });
  },
  addNew: function (req, res) {
    if ((!req.body.email) || (!req.body.password || (!req.body.name))|| (!req.body.firstname) ){
      res.status(400).send({ success: false, msg: 'Enter all values' });
    }
    else {
      var newUser = User({
        email: req.body.email,
        firstname : req.body.firstname,
        name: req.body.name ,
        password: req.body.password
      });

      newUser.save(function (err) {
        if (err) {
          res.json({ err,success: false, msg: 'Failed to save' });
        }

        else {
          res.json({ success: true, msg: 'Successfully saved' });
        }
      });
    }
  },
  getinfo: function (req, res) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      var token = req.headers.authorization.split(' ')[1];
      var decodedtoken = jwt.decode(token, config.secret);
      return res.json({ success: true, msg: 'hello ' + decodedtoken.name });
    }
    else {
      return res.json({ success: false, msg: 'No header' });
    }
  }
};

module.exports = auth;