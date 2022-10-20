import list from 'src/modules/bundle/list/bundleListReducers';
import form from 'src/modules/bundle/form/bundleFormReducers';
import view from 'src/modules/bundle/view/bundleViewReducers';
import destroy from 'src/modules/bundle/destroy/bundleDestroyReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
});
