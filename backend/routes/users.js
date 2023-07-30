const router = require('express').Router();
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');
const {
  updateAvatarValidate,
  updateUserInfoValidate,
  userIdValidate,
} = require('../middlewares/validation');

router.get('/', getUsers);

router.get('/me', userIdValidate, getCurrentUser);
router.get('/:userId', userIdValidate, getUser);
router.patch('/me', updateUserInfoValidate, updateUserInfo);
router.patch('/me/avatar', updateAvatarValidate, updateUserAvatar);

module.exports = router;
