import { useState } from 'react';

// react-router components
import { useLocation } from 'react-router-dom';

// @material-ui core components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';

// Material Dashboard 2 PRO React TS examples components
import Breadcrumbs from 'src/view/layout/components/Breadcrumbs';

// Custom styles for Header
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarDesktopMenu,
  navbarMobileMenu,
} from 'src/view/layout/styles/Navbar';

// for MUI 2 Dashboard
import muiActions from 'src/modules/mui/muiActions';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

import { useDispatch } from 'react-redux';

// Declaring prop types for Header
interface Props {
  light?: boolean;
  isMini?: boolean;
}

function Header({ light, isMini }: Props): JSX.Element {
  const dispatch = useDispatch();
  const { miniSidenav } = selectMuiSettings();
  const route = useLocation().pathname.split('/').slice(1);

  const handleMiniSidenav = () => {
    dispatch(muiActions.doMiniSidenav(!miniSidenav));
  };

  // Styles for the navbar icons
  const iconsStyle = ({
    palette: { text },
  }: {
    palette: any;
  }) => ({
    color: () => {
      let colorValue = text.main;

      return colorValue;
    },
  });

  return (
    <AppBar
      position="static"
      color="inherit"
      sx={(theme) => navbar(theme)}
    >
      <Toolbar sx={navbarContainer}>
        <MDBox
          color="inherit"
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
        >
          <Breadcrumbs
            icon="home"
            title={route[route.length - 1]}
            route={route}
            light={light}
          />
          <IconButton
            sx={navbarDesktopMenu}
            onClick={handleMiniSidenav}
            size="small"
            disableRipple
          >
            <Icon fontSize="medium" sx={iconsStyle}>
              {miniSidenav ? 'menu_open' : 'menu'}
            </Icon>
          </IconButton>
        </MDBox>
        {isMini ? null : (
          <MDBox
            sx={(theme) => navbarRow(theme, { isMini })}
          >
            <MDBox color={'inherit'}>
              <IconButton
                size="large"
                disableRipple
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle}>
                  {miniSidenav ? 'menu_open' : 'menu'}
                </Icon>
              </IconButton>
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Declaring default props for Header
Header.defaultProps = {
  light: false,
  isMini: false,
};

export default Header;
