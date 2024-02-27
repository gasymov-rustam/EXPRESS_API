import { JSX, memo } from 'react';
import { useCard } from './useCard';
import { Link } from 'react-router-dom';
import { FcDislike } from 'react-icons/fc';
import { FaRegComment } from 'react-icons/fa6';
import { RiDeleteBinLine } from 'react-icons/ri';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { Card as NextUiCard, CardBody, CardFooter, CardHeader, Spinner } from '@nextui-org/react';

import { User } from '../User';
import { MetaInfo } from '../MetaInfo';
import { Typography } from '../Typography';
import { ErrorMessage } from '../ErrorMessage';
import { formatToClientDate } from '../../utils';

export interface CardProps {
  avatarUrl: string;
  name: string;
  authorId: string;
  content: string;
  commentId?: string;
  likesCount?: number;
  commentsCount?: number;
  createdAt?: Date;
  id?: string;
  cardFor: 'comment' | 'post' | 'current-post';
  likedByUser?: boolean;
}

export const Card = memo((props: CardProps): JSX.Element | null => {
  const {
    avatarUrl = '',
    name = '',
    content = '',
    authorId = '',
    id = '',
    likesCount = 0,
    commentsCount = 0,
    cardFor = 'post',
    likedByUser = false,
    createdAt,
    commentId = '',
  } = props;

  const { currentUser, error, handleClick, handleDelete, deletePostStatus, deleteCommentStatus } = useCard(props);

  return (
    <NextUiCard className="mb-5">
      <CardHeader className="justify-between items-center bg-transparent">
        <Link to={`/users/${authorId}`}>
          <User
            name={name}
            className="text-small font-semibold leading-none text-default-600"
            avatarUrl={avatarUrl}
            description={createdAt && formatToClientDate(createdAt)}
          />
        </Link>

        {authorId === currentUser?.id && (
          <div className="cursor-pointer" onClick={handleDelete}>
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? <Spinner /> : <RiDeleteBinLine />}
          </div>
        )}
      </CardHeader>

      <CardBody className="px-3 py-2 mb-5">
        <Typography>{content}</Typography>
      </CardBody>

      {cardFor !== 'comment' && (
        <CardFooter className="gap-3">
          <div className="flex gap-5 items-center">
            <div onClick={handleClick}>
              <MetaInfo count={likesCount} Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder} />
            </div>
            <Link to={`/posts/${id}`}>
              <MetaInfo count={commentsCount} Icon={FaRegComment} />
            </Link>
          </div>
          <ErrorMessage error={error} />
        </CardFooter>
      )}
    </NextUiCard>
  );
});
