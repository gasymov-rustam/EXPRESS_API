const PATHS = Object.freeze({
  REGISTER: '/register',
  UPLOADS: 'uploads',
  LOGIN: '/login',
  CURRENT: '/current',
  USER: '/users/:id',
  USER_UPDATE: '/users/:id',
  POSTS: '/posts',
  DELETE_POST: '/posts/:id',
  GET_POST: '/posts/:id',
  COMMENTS: '/comments',
  DELETE_COMMENT: '/comments/:id',
  LIKES: '/likes',
  LIKE: '/likes/:id',
  FOLLOW: '/follow',
  UNFOLLOW: '/unfollow/:id',
});

module.exports = { PATHS };