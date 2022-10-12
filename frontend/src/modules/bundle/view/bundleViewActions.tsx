import BundleService from 'src/modules/bundle/bundleService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'BUNDLE_VIEW';

const bundleViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: bundleViewActions.FIND_STARTED,
      });

      const record = await BundleService.find(id);

      dispatch({
        type: bundleViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: bundleViewActions.FIND_ERROR,
      });

      getHistory().push('/bundle');
    }
  },
};

export default bundleViewActions;
