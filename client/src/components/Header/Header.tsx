import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import { JSX, memo } from 'react';
import { FaRegMoon } from 'react-icons/fa';
import { LuSunMedium } from 'react-icons/lu';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CiLogout } from 'react-icons/ci';
import { useAppDispatch } from '../../app/hooks';
import { userSliceActions, userSliceSelectors } from '../../features/user';
import { THEME_VARIANT_TYPE, useTheme } from '../../providers/ThemeProvider';

export const Header = memo((): JSX.Element | null => {
  const isAuthenticated = useSelector(userSliceSelectors.selectIsAuthenticated);
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLightTheme = theme.theme === THEME_VARIANT_TYPE.LIGHT;

  const handleLogout = () => {
    dispatch(userSliceActions.logout());
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Network Social</p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem className="lg:flex text-3xl cursor-pointer" onClick={() => toggleTheme?.()}>
          {isLightTheme ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>

        <NavbarItem>
          {isAuthenticated && (
            <Button color="default" variant="flat" className="gap-2" onClick={handleLogout}>
              <CiLogout /> <span>Выйти</span>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
});
