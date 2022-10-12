import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Menu, IconButton, Icon } from '@mui/material';
import { getHistory } from 'src/modules/store';
import authActions from 'src/modules/auth/authActions';
import { i18n } from 'src/i18n';

// Custom styles for Header
import { navbarIconButton } from 'src/mui/examples/Navbars/DashboardNavbar/styles';

import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import NotificationItem from 'src/mui/examples/Items/NotificationItem';

// Declaring prop types for Header
interface Props {
  absolute?: boolean;
  light?: boolean;
  isMini?: boolean;
}

function UserMenu({ light }: Props): JSX.Element {
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const doSignout = () => {
    dispatch(authActions.doSignout());
  };

  const doNavigateToProfile = () => {
    getHistory().push('/profile');
  };

  const doNavigateToPasswordChange = () => {
    getHistory().push('/password-change');
  };

  const { transparentNavbar, darkMode } =
    selectMuiSettings();

  // Styles for the navbar icons
  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba },
  }: {
    palette: any;
    functions: any;
  }) => ({
    color: () => {
      let colorValue =
        light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode
          ? rgba(text.main, 0.6)
          : text.main;
      }

      return colorValue;
    },
  });

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={navbarIconButton}
        size="small"
        color="inherit"
        disableRipple
      >
        <Icon sx={iconsStyle}>account_circle</Icon>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <NotificationItem
          onClick={doNavigateToProfile}
          icon={<Icon>person_outline</Icon>}
          title={i18n('auth.profile.title')}
        />
        <NotificationItem
          onClick={doNavigateToPasswordChange}
          icon={<Icon>lock</Icon>}
          title={i18n('auth.passwordChange.title')}
        />
        <NotificationItem
          onClick={doSignout}
          icon={<Icon>exit_to_app</Icon>}
          title={i18n('auth.signout')}
        />
      </Menu>
    </>
  );
}

// Declaring default props for UserMenu
UserMenu.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

export default UserMenu;
