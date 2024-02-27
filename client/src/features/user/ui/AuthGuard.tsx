import { ReactNode } from 'react';
import { Spinner } from '@nextui-org/react';

import { useCurrentQuery } from '../../../services';

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = (props: AuthGuardProps) => {
  const { children } = props;
  const { isLoading } = useCurrentQuery();

  if (isLoading) {
    return <Spinner />;
  }

  return children;
};
