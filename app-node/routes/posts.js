var Post = require('../models/post.js');
var mongoose = require('mongoose');
var postsApi = {
  getAll: (req, res) => {
    return mongoose.connection.db.collection('posts').aggregate([{
      $lookup: {
        from: 'tags',
        localField:'tags',
        foreignField:'_id',
        as : 'tags'
      },
       $lookup: {
        from: 'users',
        localField:'author',
        foreignField:'_id',
        as : 'author'
      }
    }], (err, posts) => {
      if (!err) {
        return res.send({
          'data': posts
        });
      } else {
        return res.send(500, err);
      }
    });
  },
  getById: (req, res) => {
    return Post.findOne({
      '_id': req.params.id
    }, function (err, post) {
      if (!err) {
        return res.json({
          'data': post
        });
      } else {
        return res.send(500, err);
      }
    });
  },
  newPost: (req, res) => {
    var post = new Post({
      title: req.body.title,
      url: req.body.url,
      content: req.body.content,
      tags: req.body.tags,
      date: new Date(Date.now()),
      author: req.body.author
    });

    post.save(function (err) {
      if (!err) {
        res.status(200);
        res.json(post);

      } else {
        res.status(500);
        res.json(err);
      }
    });
  },
  editPost: (req, res) => {
    var id = req.params.id;
    Post.update({
      _id: id
    }, {
      $set: {
        title: req.body.title || '',
        url: req.body.url || '',
        content: req.body.content || '',
        date: new Date(Date.now()),
        tags: req.body.tags,
        author : req.body.user
      }
    }).exec();
    res.status(200);
    return res.send();
  },
  deletePost: (req, res) => {
    var id = req.params.id;
    Post.remove({
      _id: id
    }, function (err) {
      return err;
    });
    res.status(200);
    return res.send();
  }
};

module.exports = postsApi;