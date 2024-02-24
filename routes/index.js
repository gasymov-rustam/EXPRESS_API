const express = require('express');
const router = express.Router();
const PATH = require('../constants/path.js');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: PATH.UPLOADS,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage });

router.use(PATH.REGISTER, (req, res) => {
  res.send('Register');
});

module.exports = router;