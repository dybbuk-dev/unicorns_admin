import listActions from 'src/modules/bundle/list/bundleListActions';
import BundleService from 'src/modules/bundle/bundleService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'BUNDLE_DESTROY';

const bundleDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: bundleDestroyActions.DESTROY_STARTED,
      });

      await BundleService.destroyAll([id]);

      dispatch({
        type: bundleDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(i18n('bundle.destroy.success'));

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/bundle');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: bundleDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: bundleDestroyActions.DESTROY_ALL_STARTED,
      });

      await BundleService.destroyAll(ids);

      dispatch({
        type: bundleDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(i18n('bundle.destroyAll.success'));

      getHistory().push('/bundle');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: bundleDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default bundleDestroyActions;
