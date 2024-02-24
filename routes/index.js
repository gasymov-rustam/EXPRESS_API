const multer = require('multer');
const express = require('express');
const router = express.Router();
const { PATHS } = require('../constants');
const { UserController, PostController } = require('../controllers');
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
router.put(PATHS.USER_UPDATE, authMiddleware, UserController.updateUser);
router.get(PATHS.CURRENT, authMiddleware, UserController.current);
router.get(PATHS.USER, authMiddleware, UserController.getUserById);

// posts routes
router.post('/posts', authMiddleware, PostController.createPost);
router.get('/posts', authMiddleware, PostController.getAllPosts);
router.get('/posts/:id', authMiddleware, PostController.getPostById);
router.delete('/posts/:id', authMiddleware, PostController.deletePost);

module.exports = router;