const { prisma } = require('../prisma/prisma-client');
const { ErrorsMessages } = require('../constants');

const CommentController = {
  createComment: async (req, res) => {
    try {
      const { postId, content } = req.body;
      const userId = req.user.userId;

      if (!postId || !content) {
        return res.status(400).json({ error: ErrorsMessages.ALL_FIELDS_REQUIRED });
      }

      const isPostExists = await prisma.post.findUnique({ where: { id: postId } });

      if (!isPostExists) {
        return res.status(404).json({ error: ErrorsMessages.POST_NOT_FOUND });
      }

      const comment = await prisma.comment.create({
        data: {
          postId,
          userId,
          content,
        },
      });

      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: ErrorsMessages.INTERNAL_SERVER_ERROR });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      // Check if comment exists
      const comment = await prisma.comment.findUnique({ where: { id } });

      if (!comment) {
        return res.status(404).json({ error: ErrorsMessages.COMMENT_NOT_FOUND });
      }

      // Check if the user is the owner of the comment
      if (comment.userId !== userId) {
        return res.status(403).json({ error: ErrorsMessages.FORBIDDEN });
      }

      // Delete the comment
      await prisma.comment.delete({ where: { id } });

      res.json(comment);
    } catch (error) {
      res.status(500).json({ error: ErrorsMessages.INTERNAL_SERVER_ERROR });
    }
  },
};

module.exports = CommentController;