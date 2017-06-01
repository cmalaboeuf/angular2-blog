var Post = require('../models/post.js');

var postsApi = {
  getAll: (req, res) => {
    return Post.find(function (err, posts) {
      if (!err) {
        return res.send({ 'posts': posts });
      } else {
        return res.send(500, err);
      }
    });
  },
  getById: (req, res) => {
    return Post.findOne(function (err, posts) {
      if (!err) {
        return res.json(posts);
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
      date: new Date(Date.now())
    });

    post.save(function (err) {
      if (!err) {
        res.status(200);
        res.json(post)

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
        date: new Date(Date.now())
      }}).exec();
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