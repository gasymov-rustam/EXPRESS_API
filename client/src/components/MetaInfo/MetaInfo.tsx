import { JSX, memo } from 'react';
import { IconType } from 'react-icons';

interface MetaInfoProps {
  count: number;
  Icon: IconType;
}

export const MetaInfo = memo((props: MetaInfoProps): JSX.Element | null => {
  const { Icon, count } = props;

  return (
    <div className="flex items-center gap-2 cursor-pointer">
      {count > 0 && <p className="font-semibold text-default-400 text-l ">{count}</p>}

      <p className="text-default-400 text-xl hover:text-2xl ease-in duration-100">
        <Icon />
      </p>
    </div>
  );
});
