import { JSX, memo } from 'react';
import { User as NextUiUser } from '@nextui-org/react';

import { BASE_URL } from '../../constants';

interface UserProps {
  name: string;
  avatarUrl: string;
  description?: string;
  className?: string;
}

export const User = memo((props: UserProps): JSX.Element | null => {
  const { name = '', description = '', avatarUrl = '', className = '' } = props;

  return (
    <NextUiUser
      name={name}
      className={className}
      description={description}
      avatarProps={{
        src: `${BASE_URL}${avatarUrl}`,
      }}
    />
  );
});
