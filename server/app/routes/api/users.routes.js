const router = require('express').Router();
const auth = require('../auth.js');

const user = require('../../controllers/user.controller');

//api/user
router.post('/register', user.create_user);
router.post('/login', user.login);
router.get('/', auth.required, user.get_user);
router.put('/settings', auth.required, user.update_user);

module.exports = router;