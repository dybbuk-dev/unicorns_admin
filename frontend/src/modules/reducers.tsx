import { connectRouter } from 'connected-react-router';
import layout from 'src/modules/layout/layoutReducers';
import auth from 'src/modules/auth/authReducers';
import tenant from 'src/modules/tenant/tenantReducers';
import user from 'src/modules/user/userReducers';
import auditLog from 'src/modules/auditLog/auditLogReducers';
import settings from 'src/modules/settings/settingsReducers';
import { combineReducers } from 'redux';
import mui from 'src/modules/mui/muiReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    mui,
    layout,
    auth,
    tenant,
    user,
    auditLog,
    settings,
  });
