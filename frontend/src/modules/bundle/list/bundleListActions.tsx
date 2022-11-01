import BundleService from 'src/modules/bundle/bundleService';
import Errors from 'src/modules/shared/error/errors';

const prefix = 'BUNDLE_LIST';

const bundleListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  doFetch: () => async (dispatch) => {
    try {
      dispatch({
        type: bundleListActions.FETCH_STARTED,
      });

      const response = await BundleService.getAllBundles();

      dispatch({
        type: bundleListActions.FETCH_SUCCESS,
        payload: response,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: bundleListActions.FETCH_ERROR,
      });
    }
  },
};

export default bundleListActions;
