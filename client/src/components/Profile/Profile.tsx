import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import { JSX, memo } from 'react';
import { MdAlternateEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { BASE_URL } from '../../constants';
import { userSliceSelectors } from '../../features/user';

export const Profile = memo((): JSX.Element | null => {
  const current = useAppSelector(userSliceSelectors.selectCurrent);

  if (!current) {
    return null;
  }

  const { name, email, avatarUrl, id } = current;

  return (
    <Card className="py-4 w-[302px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Image alt="Card background" className="object-cover rounded-xl" src={`${BASE_URL}${avatarUrl}`} width={370} />
      </CardHeader>

      <CardBody className="overflow-visible py-2">
        <Link to={`/users/${id}`}>
          <h4 className="font-bold text-large mb-2">{name}</h4>
        </Link>

        <p className="text-default-500 flex items-center gap-2">
          <MdAlternateEmail />
          {email}
        </p>
      </CardBody>
    </Card>
  );
});
