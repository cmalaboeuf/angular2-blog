var User = require('../models/user.js');
var winston = require('winston');

var userApi = {
  getAll: (req, res) => {
    User.find({}, {
      password: 0
    }, (err, data) => {
      if (!err)
        return res.send({
          data
        });
      else
        return res.send(500, err);
    });
  },
  getById: (req, res) => {
    User.findById({
      '_id': req.params.id
    }, {
      password: 0
    }, (err, data) => {
      return res.send({
        'data': data
      });
    });
  },
  getMe: (req, res) => {
    User.findById({
      '_id': req.user._id
    }, {
      password: 0
    }, (err, data) => {
      return res.send({
        'data': data
      });
    });

  },
  editUser: (req, res, next) => {
    var id = req.params.id;
    if (!req.body.name) {
      res.status(400);
      next();
    } else {
      winston.info('start');
      User.update({
        _id: id
      }, req.body, {
        new: true
      }, (err) => {
        if (err) {
          return res.status(500).send({
            err
          });
        } else {
          res.status(200);
          return res.send({});
        }

      });
    }
  }
};
module.exports = userApi;
