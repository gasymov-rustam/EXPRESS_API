import { JSX, memo, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { userSliceSelectors } from '../../features/user';
import { Container } from '../Container';
import { Header } from '../Header';
import { NavBar } from '../NavBar';
import { Profile } from '../Profile';

export const Layout = memo((): JSX.Element | null => {
  const isAuthenticated = useAppSelector(userSliceSelectors.selectIsAuthenticated);
  const user = useAppSelector(userSliceSelectors.selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, []);

  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <NavBar />
        </div>

        <div className="flex-1 p-4">
          <Outlet />
        </div>

        <div className="flex-2 p-4">
          <div className="flex-col flex gap-5">{!user && <Profile />}</div>
        </div>
      </Container>
    </>
  );
});
