import {
  useDeleteCommentMutation,
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
  useLikePostMutation,
  useUnlikePostMutation,
} from '../../services';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { userSliceSelectors } from '../../features/user';
import { CardProps } from './Card';
import { isError } from '../../utils';

export const useCard = ({ cardFor, likedByUser, id = '', commentId = '' }: CardProps) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
  const [triggerGetPostById] = useLazyGetPostByIdQuery();
  const [deletePost, deletePostStatus] = useDeletePostMutation();
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
  const currentUser = useAppSelector(userSliceSelectors.selectCurrent);

  const refetchPosts = useCallback(async () => {
    switch (cardFor) {
      case 'post':
        await triggerGetAllPosts().unwrap();
        break;
      case 'current-post':
        await triggerGetAllPosts().unwrap();
        break;
      case 'comment':
        await triggerGetPostById(id).unwrap();
        break;
      default:
        throw new Error('Неверный аргумент cardFor');
    }
  }, [cardFor, id]);

  const handleClick = useCallback(async () => {
    try {
      if (likedByUser) {
        await unlikePost(id).unwrap();
      } else {
        await likePost({ postId: id }).unwrap();
      }

      await refetchPosts();
    } catch (err) {
      if (isError(err)) {
        setError(err.data.error);
      } else {
        setError(err as string);
      }
    }
  }, [likedByUser, id]);

  const handleDelete = useCallback(async () => {
    try {
      switch (cardFor) {
        case 'post':
          await deletePost(id).unwrap();
          await refetchPosts();
          break;
        case 'current-post':
          await deletePost(id).unwrap();
          navigate('/');
          break;
        case 'comment':
          await deleteComment(commentId).unwrap();
          await refetchPosts();
          break;
        default:
          throw new Error('Неверный аргумент cardFor');
      }
    } catch (err) {
      console.log(err);
      if (isError(err)) {
        setError(err.data.error);
      } else {
        setError(err as string);
      }
    }
  }, [cardFor, id, commentId]);

  return { handleClick, handleDelete, error, currentUser, deletePostStatus, deleteCommentStatus };
};
