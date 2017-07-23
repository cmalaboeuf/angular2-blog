var Post = require('../models/post.js');
var mongoose = require('mongoose');
var postsApi = {
  getAll: (req, res) => {
    return mongoose.connection.db.collection('posts').aggregate([
      {
        $lookup: {
          from: 'tags',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags'
        },// eslint-disable-next-line no-dupe-keys,
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author'
        }
      },{$sort: {'createdAt':-1}}
      ,{$project : {author:{password:0}} }//projection must be after !!!!
    ], (err, posts) => {
      if (!err) {
        return res.send({
          'data': posts || []
        });
      } else {
        return res.send(500, err);
      }
    });
  },
  getByUrl: (req, res) => {
    return mongoose.connection.db.collection('posts').aggregate([
      //find a way to delete password field in response
      {
        $lookup: {
          from: 'tags',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags'
        },// eslint-disable-next-line no-dupe-keys,
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author'
        }
      },
      {$project : {author:{password:0}} },
      {$sort: {'createdAt':-1}},
      {$match: {'url':req.params.url}}

    ], function (err, post) {
      if (!err) {
        return res.json({
          'data': post[0]
        });
      } else {
        return res.send(400, err);
      }
    });
  },
  newPost: (req, res) => {
    var post = new Post({
      title: req.body.title,
      url: req.body.url,
      content: req.body.content,
      tags: req.body.tags,
      author: req.body.author
    });

    post.save(function (err) {
      if (!err) {
        res.status(200);
        res.json({data:post, msg : 'Post successfully added'});

      } else {
        res.status(400);
        res.json({err:err});
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
        tags: req.body.tags,
        author: req.body.user
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
