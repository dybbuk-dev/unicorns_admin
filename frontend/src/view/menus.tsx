import Permissions from 'src/security/permissions';
import { i18n } from 'src/i18n';
import { Icon } from '@mui/material';

const permissions = Permissions.values;

const menus = [
  {
    path: '/',
    exact: true,
    icon: <Icon fontSize="medium">home</Icon>,
    name: i18n('home.menu'),
    permissionRequired: null,
  },
  {
    path: '/bundle',
    permissionRequired: permissions.bundleRead,
    name: i18n('bundle.menu'),
    icon: <Icon fontSize="medium">view_comfy_alt</Icon>,
  },
  {
    path: '/segment',
    permissionRequired: permissions.segmentRead,
    name: i18n('segment.menu'),
    icon: <Icon fontSize="medium">face</Icon>,
  },
  {
    path: '/rebate',
    permissionRequired: permissions.rebateRead,
    name: i18n('rebate.menu'),
    icon: <Icon fontSize="medium">redeem</Icon>,
  },
  {
    path: '/experiment',
    permissionRequired: permissions.experimentRead,
    name: i18n('experiment.menu'),
    icon: <Icon fontSize="medium">science</Icon>,
  },
].filter(Boolean);

const settingRoutes = [
  {
    name: i18n('settings.menu'),
    key: 'settings',
    icon: <Icon fontSize="medium">settings</Icon>,
    permissionRequired: permissions.settingsEdit,
    collapse: [
      {
        path: '/audit-logs',
        name: i18n('auditLog.menu'),
        permissionRequired: permissions.auditLogRead,
        icon: <Icon>restore</Icon>,
      },
    ],
  },
].filter(Boolean);

const profileRoutes = [
  {
    name: i18n('auth.profile.title'),
    path: '/profile',
    icon: <Icon>person_outline</Icon>,
  },
  {
    name: i18n('auth.passwordChange.title'),
    path: '/password-change',
    icon: <Icon>lock</Icon>,
  },
].filter(Boolean);

const userRoutes = [
  {
    path: '/user',
    name: i18n('user.menu'),
    permissionRequired: permissions.userRead,
    icon: <Icon fontSize="medium">person</Icon>,
  },
].filter(Boolean);

export { menus, settingRoutes, profileRoutes, userRoutes };
