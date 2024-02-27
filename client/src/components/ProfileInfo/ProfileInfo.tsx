import { JSX, memo } from 'react';

interface ProfileInfoProps {
  title: string;
  info?: string;
}

export const ProfileInfo = memo((props: ProfileInfoProps): JSX.Element | null => {
  const { title, info } = props;

  if (!info) return null;

  return (
    <p className="font-semibold">
      <span className="text-gray-500 mr-2">{title}</span>
      {info}
    </p>
  );
});
