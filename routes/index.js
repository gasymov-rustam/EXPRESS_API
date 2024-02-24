const express = require('express');
const router = express.Router();
const { PATHS } = require('../constants');
const multer = require('multer');
const { UserController } = require('../controllers');

const storage = multer.diskStorage({
  destination: PATHS.UPLOADS,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage });

router.post(PATHS.REGISTER, UserController.register);
router.post(PATHS.LOGIN, UserController.login);
router.put(PATHS.USER_UPDATE, UserController.updateUser);
router.get(PATHS.CURRENT, UserController.current);
router.get(PATHS.USER, UserController.getUserById);

module.exports = router;