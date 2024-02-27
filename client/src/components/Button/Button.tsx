import { JSX, ReactNode } from 'react';
import { Button as NextButton, type ButtonProps as NextButtonProps } from '@nextui-org/react';

interface ButtonProps extends NextButtonProps {
  children: ReactNode;
  icon?: JSX.Element;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

export const Button = (props: ButtonProps): JSX.Element | null => {
  const { children, icon, className, type, fullWidth, color } = props;

  return (
    <NextButton
      startContent={icon}
      size="lg"
      color={color}
      variant="light"
      className={className}
      type={type}
      fullWidth={fullWidth}
    >
      {children}
    </NextButton>
  );
};
