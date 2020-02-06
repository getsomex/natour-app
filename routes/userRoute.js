const express = require('express');

const router = express.Router();

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
  resizeUSerPhoto
} = require('../controllers/userController');

const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
  logout
} = require('../controllers/authController');

router.post('/signup', signUp);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
// Protect all routes after this middleware
router.use(protect);

router.patch('/updateMyPassword', updatePassword);
router.get('/me', getMe, getUser);
router.delete('/deleteMe', deleteMe);
router.patch('/updateMe', uploadUserPhoto, resizeUSerPhoto, updateMe);
router.post('/');

router.use(restrictTo('admin'));
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);
router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
