var Post = require('../models/post.js');

var postsApi = {
    getAll: function (req, res) {
        return Post.find(function (err, posts) {
            if (!err) {
                return res.send({ "posts": posts });
            } else {
                return res.send(500, err);
            }
        });
    },
    getById: function (req, res) {
        return Post.findOne(function (err, posts) {
            if (!err) {
                return res.json(posts);
            } else {
                return res.send(500, err);
            }
        });
    },
    newPost: function (req, res) {
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
    editPost: function (req, res) {
        var id = req.params.id;
        Post.update({
            _id: id
        }, {
                $set: {
                    title: req.body.title || "",
                    url: req.body.url || "",
                    content: req.body.content || "",
                    date: new Date(Date.now())
                }
            }).exec();
        res.status(200)
        return res.send();
    },
    deletePost: function (req, res) {
        var id = req.params.id;
        Post.remove({
            _id: id
        }, function (err) {
            return console.log(err);
        });
        res.status(200)
        return res.send();
    }
}

module.exports = postsApi;