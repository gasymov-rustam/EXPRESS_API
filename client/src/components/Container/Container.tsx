import { JSX, memo, ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export const Container = memo((props: ContainerProps): JSX.Element | null => {
  const { children } = props;

  return <div className="flex max-w-screen-xl mx-auto mt-10">{children}</div>;
});
