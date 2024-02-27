import { JSX, memo } from 'react';

interface CountInfoProps {
  count: number;
  title: string;
}

export const CountInfo = memo((props: CountInfoProps): JSX.Element | null => {
  const { count, title } = props;

  return (
    <div className="flex flex-col items-center space-x-2 p-4">
      <span className="text-4xl font-semibold">{count}</span>
      <span>{title}</span>
    </div>
  );
});
