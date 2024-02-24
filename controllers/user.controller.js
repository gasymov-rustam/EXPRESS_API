const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { toPng } = require('jdenticon');
const { sign } = require('jsonwebtoken');

const { ErrorsMessages, PATHS } = require('../constants');
const { prisma } = require('../prisma/prisma-client.js');
const { userDto } = require('../dto');

const UserController = {
  register: async (req, res) => {
    const { body } = req;
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: ErrorsMessages.ALL_FIELDS_REQUIRED });
    }

    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ message: ErrorsMessages.USER_ALREADY_EXISTS });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const png = toPng(name, 200);
      const avatarName = `${name}_${Date.now()}.png`;
      const avatarPath = path.join(__dirname, '..', 'uploads', avatarName);

      fs.writeFileSync(avatarPath, png, 'binary');

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          avatarUrl: `/${PATHS.UPLOADS}/${avatarName}`,
        },
      });

      return res.status(201).json(userDto(user));
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: ErrorsMessages.ALL_FIELDS_REQUIRED });
    }

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(400).json({ error: ErrorsMessages.INVALID_LOGIN_OR_PASSWORD });
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return res.status(400).json({ error: ErrorsMessages.INVALID_LOGIN_OR_PASSWORD });
      }

      const token = sign({ userId: user.id }, process.env.SECRET_KEY);

      res.json({ token });
    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).json({ error: error.message });
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          followers: true,
          following: true,
        },
      });

      if (!user) {
        return res.status(404).json({ error: ErrorsMessages.USER_NOT_FOUND });
      }

      const isFollowing = await prisma.follows.findFirst({
        where: {
          AND: [
            { followerId: userId },
            { followingId: id },
          ],
        },
      });

      res.json({ ...userDto(user), isFollowing: Boolean(isFollowing) });
    } catch (error) {
      res.status(500).json({ error: 'Что-то пошло не так' });
    }
  },

  updateUser: async () => {
  },
  current: async () => {
  },
};

module.exports = UserController;