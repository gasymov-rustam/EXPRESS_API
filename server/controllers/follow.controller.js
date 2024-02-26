const { prisma } = require('../prisma/prisma-client');
const { ErrorsMessages } = require('../constants');

const FollowController = {
  followUser: async (req, res) => {
    const { followingId } = req.body;
    const userId = req.user.userId;

    if (followingId === userId) {
      return res.status(500).json({ message: ErrorsMessages.FOLLOW_BY_YOURSELF });
    }

    try {
      const existingSubscription = await prisma.follows.findFirst({
        where: {
          AND: [
            {
              followerId: userId,
            },
            {
              followingId,
            },
          ],
        },
      });

      if (existingSubscription) {
        return res.status(400).json({ message: ErrorsMessages.FOLLOW_ALREADY_EXISTS });
      }

      await prisma.follows.create({
        data: {
          follower: { connect: { id: userId } },
          following: { connect: { id: followingId } },
        },
      });

      res.status(201).json({ message: ErrorsMessages.SUCCESSFULLY_FOLLOWED });
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ error: ErrorsMessages.INTERNAL_SERVER_ERROR });
    }
  },

  unfollowUser: async (req, res) => {
    const { followingId } = req.body;
    const userId = req.user.userId;

    try {
      const follows = await prisma.follows.findFirst({
        where: {
          AND: [{ followerId: userId }, { followingId: followingId }],
        },
      });

      if (!follows) {
        return res.status(404).json({ error: ErrorsMessages.FOLLOW_NOT_FOUND });
      }

      await prisma.follows.delete({
        where: { id: follows.id },
      });

      res.status(200).json({ message: ErrorsMessages.SUCCESSFULLY_UNFOLLOWED });
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ error: ErrorsMessages.INTERNAL_SERVER_ERROR });
    }
  },
};

module.exports = FollowController;