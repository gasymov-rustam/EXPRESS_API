const { prisma } = require('../prisma/prisma-client');
const { ErrorsMessages } = require('../constants');

const LikeController = {
  likePost: async (req, res) => {
    const { postId } = req.body;

    const userId = req.user.userId;

    if (!postId) {
      return res.status(400).json({ error: ErrorsMessages.ALL_FIELDS_REQUIRED });
    }

    try {
      const isPostExists = await prisma.post.findUnique({ where: { id: postId } });

      if (!isPostExists) {
        return res.status(404).json({ error: ErrorsMessages.POST_NOT_FOUND });
      }
      
      const existingLike = await prisma.like.findFirst({
        where: { postId, userId },
      });

      if (existingLike) {
        return res.status(400).json({ error: ErrorsMessages.LIKE_ALREADY_EXISTS });
      }

      const like = await prisma.like.create({
        data: { postId, userId },
      });

      res.json(like);
    } catch (error) {
      res.status(500).json({ error: ErrorsMessages.INTERNAL_SERVER_ERROR });
    }
  },

  unlikePost: async (req, res) => {
    const { id } = req.params;

    const userId = req.user.userId;

    if (!id) {
      return res.status(400).json({ error: ErrorsMessages.DISLIKE_ALREADY_EXISTS });
    }

    try {
      const existingLike = await prisma.like.findFirst({
        where: { postId: id, userId },
      });

      if (!existingLike) {
        return res.status(400).json({ error: ErrorsMessages.LIKE_NOT_FOUND });
      }

      const like = await prisma.like.deleteMany({
        where: { postId: id, userId },
      });

      res.json(like);
    } catch (error) {
      res.status(500).json({ error: ErrorsMessages.INTERNAL_SERVER_ERROR });
    }
  },
};

module.exports = LikeController;