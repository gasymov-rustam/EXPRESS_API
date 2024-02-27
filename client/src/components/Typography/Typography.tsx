import { JSX } from 'react';

interface TypographyProps {
  children: string;
  size?: string;
}

export const Typography = (props: TypographyProps): JSX.Element | null => {
  const { children, size = 'text-xl' } = props;

  return <p className={`${size}`}>{children}</p>;
};
