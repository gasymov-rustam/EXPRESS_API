import { api } from './api';
import { API_PATHS } from '../constants';

export const followApi = api.injectEndpoints({
  endpoints: (builder) => ({
    followUser: builder.mutation<void, { followingId: string }>({
      query: (body) => ({
        url: API_PATHS.FOLLOW,
        method: 'POST',
        body,
      }),
    }),

    unfollowUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `${API_PATHS.UNFOLLOW}/${userId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useFollowUserMutation, useUnfollowUserMutation } = followApi;

export const { endpoints: followApiEndpoints } = followApi;
