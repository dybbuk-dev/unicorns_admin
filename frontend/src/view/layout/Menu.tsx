import authSelectors from 'src/modules/auth/authSelectors';
import { useDispatch, useSelector } from 'react-redux';
import authActions from 'src/modules/auth/authActions';
import MDButton from 'src/mui/components/MDButton';
import { i18n } from 'src/i18n';
import { Icon } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import {
  menus,
  settingRoutes,
  userRoutes,
  profileRoutes,
} from 'src/view/menus';

import { useEffect, useState } from 'react';

// react-router-dom components
import { useLocation, NavLink } from 'react-router-dom';

// @mui material components
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// Material Dashboard 2 PRO React TS examples components
import SidenavCollapse from 'src/view/layout/components/Sidenav/SidenavCollapse';
import SidenavList from 'src/view/layout/components/Sidenav/SidenavList';
import SidenavItem from 'src/view/layout/components/Sidenav/SidenavItem';

// Custom styles for the Sidenav
import SidenavRoot from 'src/view/layout/components/Sidenav/SidenavRoot';

// for MUI 2 Dashboard
import muiActions from 'src/modules/mui/muiActions';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { findRoute, matchedRoutes } from 'src/view/routes';
import { Avatar } from '@mui/material';
import { BrandLogo } from 'src/assets/resources';

// Declaring props types for Sidenav
interface Props {
  [key: string]: any;
}

function Menu({ ...rest }: Props): JSX.Element {
  const dispatch = useDispatch();

  const { miniSidenav } = selectMuiSettings();

  const color = 'dark';

  const [openCollapse, setOpenCollapse] = useState<
    boolean | string
  >(false);
  const [openNestedCollapse, setOpenNestedCollapse] =
    useState<boolean | string>(false);
  const location = useLocation();
  const { pathname } = location;
  const currentRoutes = matchedRoutes(pathname);
  const currentRoute = findRoute(pathname, currentRoutes);
  const collapseName =
    (currentRoute && currentRoute.collapseName) || false;
  const items = pathname.split('/').slice(1);
  const itemParentName = items[1];

  const doSignout = () => {
    dispatch(authActions.doSignout());
  };

  const closeSidenav = () => {
    dispatch(muiActions.doMiniSidenav(true));
  };

  const userText = useSelector(
    authSelectors.selectCurrentUserNameOrEmailPrefix,
  );
  const userAvatar = useSelector(
    authSelectors.selectCurrentUserAvatar,
  );

  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );
  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );

  const permissionChecker = new PermissionChecker(
    currentTenant,
    currentUser,
  );

  const match = (permission) => {
    return permissionChecker.match(permission);
  };

  useEffect(() => {
    setOpenCollapse(collapseName);
    setOpenNestedCollapse(itemParentName);
  }, [collapseName, itemParentName]);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      dispatch(
        muiActions.doMiniSidenav(
          window.innerWidth < 1200 || miniSidenav,
        ),
      );
    }

    /**
     * The event listener that's calling the handleMiniSidenav function when resizing the window.
     */
    window.addEventListener('resize', handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () =>
      window.removeEventListener(
        'resize',
        handleMiniSidenav,
      );
  }, [dispatch, pathname]);

  const renderAvailable = (permissionRequired) => {
    return {
      visible: match(permissionRequired),
    };
  };

  // Render all the nested collapse items from the routes.js
  const renderNestedCollapse = (collapse: any) =>
    collapse.map(
      ({
        name,
        path,
        key,
        href,
        permissionRequired,
      }: any) => {
        const { visible } = renderAvailable(
          permissionRequired,
        );
        const active = !!findRoute(path, currentRoutes);
        if (!visible) {
          return null;
        }
        key = key || path;
        return href ? (
          <Link
            key={key}
            href={href}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: 'none' }}
          >
            <SidenavItem name={name} nested />
          </Link>
        ) : (
          <NavLink
            to={path}
            key={key}
            style={{ textDecoration: 'none' }}
          >
            <SidenavItem
              name={name}
              active={active}
              nested
            />
          </NavLink>
        );
      },
    );

  // Render the all the collpases from the routes.js
  const renderCollapse = (collapses: any) =>
    collapses.map(
      ({
        name,
        collapse,
        path,
        href,
        key,
        icon,
        permissionRequired,
      }: any) => {
        const { visible } = renderAvailable(
          permissionRequired,
        );
        const active = !!findRoute(path, currentRoutes);
        if (!visible) {
          return null;
        }

        key = key || path;

        let returnValue;

        if (collapse) {
          returnValue = (
            <SidenavItem
              key={key}
              color={color}
              name={name}
              active={
                key === itemParentName ? 'isParent' : false
              }
              open={openNestedCollapse === key}
              onClick={({ currentTarget }: any) =>
                openNestedCollapse === key &&
                currentTarget.classList.contains(
                  'MuiListItem-root',
                )
                  ? setOpenNestedCollapse(false)
                  : setOpenNestedCollapse(key)
              }
            >
              {renderNestedCollapse(collapse)}
            </SidenavItem>
          );
        } else {
          returnValue = href ? (
            <Link
              href={href}
              key={key}
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: 'none' }}
            >
              <SidenavItem
                color={color}
                name={name}
                active={!!findRoute(path, currentRoutes)}
                icon={icon}
              />
            </Link>
          ) : (
            <NavLink
              to={path}
              key={key}
              style={{ textDecoration: 'none' }}
            >
              <SidenavItem
                color={color}
                name={name}
                active={!!findRoute(path, currentRoutes)}
                icon={icon}
              />
            </NavLink>
          );
        }
        return (
          <SidenavList key={key}>{returnValue}</SidenavList>
        );
      },
    );

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = (routes) =>
    routes.map(
      ({
        type,
        name,
        icon,
        title,
        collapse,
        noCollapse,
        key,
        href,
        path,
        permissionRequired,
      }: any) => {
        const { visible } = renderAvailable(
          permissionRequired,
        );
        const active = !!findRoute(path, currentRoutes);
        if (!visible) {
          return null;
        }

        key = key || path;

        let returnValue;

        noCollapse = noCollapse || !collapse;

        if (type === 'collapse' || !type) {
          if (href) {
            returnValue = (
              <Link
                href={href}
                key={key}
                target="_blank"
                rel="noreferrer"
                sx={{ textDecoration: 'none' }}
              >
                <SidenavCollapse
                  name={name}
                  icon={icon}
                  active={key === collapseName}
                  noCollapse={noCollapse}
                />
              </Link>
            );
          } else if (noCollapse && path) {
            returnValue = (
              <NavLink to={path} key={key}>
                <SidenavCollapse
                  name={name}
                  icon={icon}
                  noCollapse={noCollapse}
                  active={active}
                >
                  {collapse
                    ? renderCollapse(collapse)
                    : null}
                </SidenavCollapse>
              </NavLink>
            );
          } else {
            returnValue = (
              <SidenavCollapse
                key={key}
                name={name}
                icon={icon}
                active={key === collapseName}
                open={openCollapse === key}
                onClick={() =>
                  openCollapse === key
                    ? setOpenCollapse(false)
                    : setOpenCollapse(key)
                }
              >
                {collapse ? renderCollapse(collapse) : null}
              </SidenavCollapse>
            );
          }
        } else if (type === 'title') {
          returnValue = (
            <MDTypography
              key={key}
              color="inherit"
              display="block"
              variant="caption"
              fontWeight="bold"
              textTransform="uppercase"
              pl={3}
              mt={2}
              mb={1}
              ml={1}
            >
              {title}
            </MDTypography>
          );
        } else if (type === 'divider') {
          returnValue = <Divider key={key} light={false} />;
        }

        return returnValue;
      },
    );

  return (
    <>
      <SidenavRoot
        {...rest}
        variant="permanent"
        ownerState={{
          miniSidenav,
        }}
      >
        <MDBox py={3}>
          <MDBox pb={1} px={4} textAlign="center">
            <MDBox
              display={{ xs: 'block', xl: 'none' }}
              position="absolute"
              top={0}
              right={0}
              p={1.625}
              onClick={closeSidenav}
              sx={{ cursor: 'pointer' }}
            >
              <MDTypography variant="h6" color="secondary">
                <Icon sx={{ fontWeight: 'bold' }}>
                  close
                </Icon>
              </MDTypography>
            </MDBox>
            <MDBox
              component={NavLink}
              to="/"
              display="flex"
              alignItems="center"
            >
              <BrandLogo sidenav={true} />
            </MDBox>
          </MDBox>
          <Divider light={false} />
          <List>
            {renderRoutes([
              {
                name: userText,
                key: 'my-profile',
                icon: (
                  <Avatar
                    src={userAvatar}
                    alt={userText}
                    sx={{ width: '32px', height: '32px' }}
                  />
                ),
                collapse: [...profileRoutes, ...userRoutes],
              },
              { type: 'divider', key: 'divider-0' },
              ...menus,
              { type: 'divider', key: 'divider-1' },
              ...settingRoutes,
            ])}
          </List>
          <MDButton
            variant="text"
            onClick={doSignout}
            sx={{ padding: 0 }}
          >
            <SidenavCollapse
              name={i18n('auth.signout')}
              icon={
                <LogoutIcon
                  fontSize="large"
                  color="primary"
                />
              }
              noCollapse={true}
              active={false}
            />
          </MDButton>
        </MDBox>
      </SidenavRoot>
    </>
  );
}

export default Menu;
