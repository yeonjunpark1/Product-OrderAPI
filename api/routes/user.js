const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const usercontroller = require('../controllers/users');
// {
//   "email": "",
//   "password": ""
// }
router.post('/signup', usercontroller.signUp);

router.get('/', checkAuth, usercontroller.get_all_users);

//login to see token
router.post('/login', usercontroller.login);

router.delete('/:userId', checkAuth, usercontroller.remove_user);

module.exports = router;
