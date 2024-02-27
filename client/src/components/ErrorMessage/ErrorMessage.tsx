import { JSX, memo } from 'react';

interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage = memo(({ error }: ErrorMessageProps): JSX.Element | null => {
  if (!error) return null;

  return <p className="text-red-500 mt-2 mb-5 text-small">{error}</p>;
});
