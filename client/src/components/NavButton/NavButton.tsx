import { JSX } from 'react';

import { Link } from 'react-router-dom';
import { Button } from '../Button';

interface NavButtonProps {
  children: React.ReactNode;
  icon: JSX.Element;
  href: string;
}

export const NavButton = (props: NavButtonProps): JSX.Element | null => {
  const { children, icon, href } = props;

  return (
    <Button className="flex justify-start text-xl" icon={icon}>
      <Link to={href}>{children}</Link>
    </Button>
  );
};
