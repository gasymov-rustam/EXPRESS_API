import { Comment } from '../types';
import { api } from './api';
import { API_PATHS } from '../constants';

export const commentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<Comment, Partial<Comment>>({
      query: (newComment) => ({
        url: API_PATHS.COMMENTS,
        method: 'POST',
        body: newComment,
      }),
    }),
    deleteComment: builder.mutation<void, string>({
      query: (commentId) => ({
        url: `${API_PATHS.COMMENTS}/${commentId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useCreateCommentMutation, useDeleteCommentMutation } = commentsApi;

export const { endpoints: commentsApiEndpoints } = commentsApi;
