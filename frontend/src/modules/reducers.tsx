import { connectRouter } from 'connected-react-router';
import layout from 'src/modules/layout/layoutReducers';
import auth from 'src/modules/auth/authReducers';
import tenant from 'src/modules/tenant/tenantReducers';
import user from 'src/modules/user/userReducers';
import bundle from 'src/modules/bundle/bundleReducers';
import form from 'src/modules/form/formReducers';
import auditLog from 'src/modules/auditLog/auditLogReducers';
import { combineReducers } from 'redux';
import mui from 'src/modules/mui/muiReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    mui,
    layout,
    form,
    auth,
    tenant,
    user,
    bundle,
    auditLog,
  });
