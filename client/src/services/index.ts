export { api } from './api';
export {
  userApi,
  useGetUserByIdQuery,
  useCurrentQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
  userApiEndpoints,
  useLoginMutation,
  useRegisterMutation,
  useUpdateUserMutation,
} from './userApi';

export {
  postApi,
  postApiEndpoints,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetAllPostsQuery,
  useLazyGetAllPostsQuery,
  useGetPostByIdQuery,
  useLazyGetPostByIdQuery,
} from './postApi';

export { commentsApi, commentsApiEndpoints, useCreateCommentMutation, useDeleteCommentMutation } from './commentsApi';

export { likesApi, likesApiEndpoints, useLikePostMutation, useUnlikePostMutation } from './likesApi';

export { followApi, followApiEndpoints, useFollowUserMutation, useUnfollowUserMutation } from './followApi';
