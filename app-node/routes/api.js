var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var http = require("http");

var auth = require('./authentication');
var posts = require('./posts');

/**
 * API Auth
 */
router.post('/authenticate', auth.authenticate);
router.post('/adduser', auth.addNew);
router.get('/getinfo', auth.getinfo);

/**
 * API Posts
 */
router.get('/posts',posts.getAll);
router.get('/posts/:id',posts.getById);
router.post('/posts', posts.newPost);

router.post('/posts/:id', posts.editPost);
router.delete('/posts/:id',posts.deletePost);

module.exports = router;