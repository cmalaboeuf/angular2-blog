var express = require('express');
var router = express.Router();
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

module.exports = router;