const multer = require('multer');
const express = require('express');
const router = express.Router();
const { PATHS } = require('../constants');
const {
  UserController,
  PostController,
  CommentController,
  LikeController,
  FollowController,
} = require('../controllers');
const { authMiddleware } = require('../middleware');

const storage = multer.diskStorage({
  destination: PATHS.UPLOADS,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage });

// user routes
router.post(PATHS.REGISTER, UserController.register);
router.post(PATHS.LOGIN, UserController.login);
router.put(PATHS.USER_UPDATE, authMiddleware, uploads.single('avatar'), UserController.updateUser);
router.get(PATHS.CURRENT, authMiddleware, UserController.current);
router.get(PATHS.USER, authMiddleware, UserController.getUserById);

// posts routes
router.post(PATHS.POSTS, authMiddleware, PostController.createPost);
router.get(PATHS.POSTS, authMiddleware, PostController.getAllPosts);
router.get(PATHS.GET_POST, authMiddleware, PostController.getPostById);
router.delete(PATHS.DELETE_POST, authMiddleware, PostController.deletePost);

// comments routes
router.post(PATHS.COMMENTS, authMiddleware, CommentController.createComment);
router.delete(
  PATHS.DELETE_COMMENT,
  authMiddleware,
  CommentController.deleteComment,
);

// likes routes
router.post(PATHS.LIKES, authMiddleware, LikeController.likePost);
router.delete(PATHS.LIKE, authMiddleware, LikeController.unlikePost);

// Роуты подписки
router.post(PATHS.FOLLOW, authMiddleware, FollowController.followUser);
router.delete(PATHS.UNFOLLOW, authMiddleware, FollowController.unfollowUser);

module.exports = router;