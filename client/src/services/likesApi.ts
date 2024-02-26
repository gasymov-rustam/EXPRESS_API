import { Like } from '../types';
import { api } from './api';
import { API_PATHS } from '../constants';

export const likesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    likePost: builder.mutation<Like, { postId: string }>({
      query: (body) => ({
        url: API_PATHS.LIKES,
        method: 'POST',
        body,
      }),
    }),
    unlikePost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `${API_PATHS.LIKES}/${postId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useLikePostMutation, useUnlikePostMutation } = likesApi;

export const { endpoints: likesApiEndpoints } = likesApi;
