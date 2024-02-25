const UserController = require('./user.controller');
const PostController = require('./post.controller');
const CommentController = require('./comment.controller');
const LikeController = require('./like.controller');
const FollowController = require('./follow.controller');

module.exports = { PostController, UserController, CommentController, LikeController, FollowController };