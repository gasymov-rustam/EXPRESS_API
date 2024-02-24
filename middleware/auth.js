const { verify } = require('jsonwebtoken');
const { ErrorsMessages } = require('../constants');

const authMiddleware = (req, res, next) => {
  const headerAuth = req.header('Authorization');

  if (!headerAuth) return res.status(401).send({ error: ErrorsMessages.UNAUTHORIZED });

  const token = headerAuth.split(' ')[1];

  if (!token) return res.status(401).send({ error: ErrorsMessages.UNAUTHORIZED });

  try {
    verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) return res.status(403).send({ error: ErrorsMessages.INVALID_TOKEN });

      req.user = decoded;
      next();
    });
  } catch (e) {
    res.status(403).send({ error: ErrorsMessages.INVALID_TOKEN });
  }
};

module.exports = { authMiddleware };