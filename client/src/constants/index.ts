export const BASE_URL =
  process.env.NODE_ENV === 'production' ? import.meta.env.VITE_PROD_HOST : import.meta.env.VITE_DEV_HOST;

export const API_PATHS = Object.freeze({
  LOGIN: '/login',
  REGISTER: '/register',
  CURRENT: '/current',
  USERS: '/users',
  POSTS: '/posts',
  COMMENTS: '/comments',
  LIKES: '/likes',
  FOLLOW: '/follow',
  UNFOLLOW: '/unfollow',
});
