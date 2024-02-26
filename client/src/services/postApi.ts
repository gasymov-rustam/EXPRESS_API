import { Post } from '../types';
import { api } from './api';
import { API_PATHS } from '../constants';

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<Post, { content: string }>({
      query: (postData) => ({
        url: API_PATHS.POSTS,
        method: 'POST',
        body: postData,
      }),
    }),
    getAllPosts: builder.query<Post[], void>({
      query: () => ({
        url: API_PATHS.POSTS,
        method: 'GET',
      }),
    }),
    getPostById: builder.query<Post, string>({
      query: (id) => ({
        url: `${API_PATHS.POSTS}/${id}`,
        method: 'GET',
      }),
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `${API_PATHS.POSTS}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} = postApi;

export const { endpoints: postApiEndpoints } = postApi;
