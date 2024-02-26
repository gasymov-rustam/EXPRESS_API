const { prisma } = require('../prisma/prisma-client');
const { ErrorsMessages } = require('../constants');

const PostController = {
  createPost: async (req, res) => {
    const { content } = req.body;

    const authorId = req.user.userId;

    if (!content) {
      return res.status(400).json({ error: ErrorsMessages.ALL_FIELDS_REQUIRED });
    }

    try {
      const post = await prisma.post.create({
        data: {
          content,
          authorId,
        },
      });

      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: ErrorsMessages.ERROR_CREATING_POST });
    }
  },

  getAllPosts: async (req, res) => {
    const userId = req.user.userId;

    try {
      const posts = await prisma.post.findMany({
        include: {
          likes: true,
          author: true,
          comments: true,
          _count: true,
        },
        orderBy: {
          createdAt: 'desc', // Sort by createdAt in descending order
        },
        // take: 1, // Limit to 10 posts
        // skip: req.query.skip ? parseInt(req.query.skip) : 1, // Skip posts if skip query param is provided
      });

      const postsWithLikeInfo = posts.map(post => ({
        ...post,
        likedByUser: post.likes.some(like => like.userId === userId),
      }));

      res.json(postsWithLikeInfo);
    } catch (err) {
      res.status(500).json({ error: ErrorsMessages.INTERNAL_SERVER_ERROR });
    }
  },

  getPostById: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
      const post = await prisma.post.findUnique({
        where: { id },
        include: {
          comments: {
            include: {
              user: true,
            },
          },
          likes: true,
          author: true,
        }, // Include related posts
      });

      if (!post) {
        return res.status(404).json({ error: ErrorsMessages.POST_NOT_FOUND });
      }

      const postWithLikeInfo = {
        ...post,
        likedByUser: post.likes.some(like => like.userId === userId),
      };

      res.json(postWithLikeInfo);
    } catch (error) {
      res.status(500).json({ error: ErrorsMessages.INTERNAL_SERVER_ERROR });
    }
  },

  deletePost: async (req, res) => {
    const { id } = req.params;

    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      return res.status(404).json({ error: ErrorsMessages.POST_NOT_FOUND });
    }

    if (post.authorId !== req.user.userId) {
      return res.status(403).json({ error: ErrorsMessages.FORBIDDEN });
    }

    try {
      const transaction = await prisma.$transaction([
        prisma.comment.deleteMany({ where: { postId: id } }),
        prisma.like.deleteMany({ where: { postId: id } }),
        prisma.post.delete({ where: { id } }),
      ]);

      res.json(transaction);
    } catch (error) {
      res.status(500).json({ error: ErrorsMessages.INTERNAL_SERVER_ERROR });
    }
  },
};

module.exports = PostController;