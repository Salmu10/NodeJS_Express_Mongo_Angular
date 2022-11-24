const router = require('express').Router();
const auth = require('../auth.js');

const comments = require('../../controllers/comment.controller.js');

//api/comments
router.param('slug', comments.get_param);
router.get('/:slug', auth.optional, comments.get_comment);
router.post('/:slug', auth.required, comments.create_comment);
router.delete('/:id', auth.required, comments.delete_comment);

module.exports = router;