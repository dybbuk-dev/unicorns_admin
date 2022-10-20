import invitation from 'src/modules/tenant/invitation/tenantInvitationReducers';
import form from 'src/modules/tenant/form/tenantFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  invitation,
  form,
});
