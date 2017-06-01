var express = require('express');
var router = express.Router();
var posts = require('./posts');
var tags = require('./tags');

/**
 * API Posts
 */
router.get('/posts',posts.getAll);
router.get('/posts/:id',posts.getById);
router.post('/posts', posts.newPost);
router.put('/posts/:id', posts.editPost);
router.delete('/posts/:id',posts.deletePost);

/**
 * API Posts
 */
router.get('/tags',tags.getAll);
router.get('/tags/:id',tags.getById);
router.post('/tags', tags.newTag);

router.put('/tags/:id', tags.editTag);
router.delete('/tags/:id',tags.deleteTag);

module.exports = router;