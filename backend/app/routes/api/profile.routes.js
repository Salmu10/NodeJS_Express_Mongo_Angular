const router = require('express').Router();
const auth = require('../auth.js');

const profile = require('../../controllers/profile.controller.js');

//api/profile
router.param('username', profile.param_username);
router.get('/:username', auth.optional, profile.find_profile);
router.post('/:username/follow', auth.required, profile.follow);
router.delete('/:username/follow', auth.required, profile.unfollow);

module.exports = router;