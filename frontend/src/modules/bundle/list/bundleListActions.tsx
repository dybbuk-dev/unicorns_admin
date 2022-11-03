import BundleService from 'src/modules/bundle/bundleService';
import Errors from 'src/modules/shared/error/errors';

const prefix = 'BUNDLE_LIST';

const bundleListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  CHANGE_STATUS_STARTED: `${prefix}_CHANGE_STATUS_STARTED`,
  CHANGE_STATUS_SUCCESS: `${prefix}_CHANGE_STATUS_SUCCESS`,
  CHANGE_STATUS_ERROR: `${prefix}_CHANGE_STATUS_ERROR`,

  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

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

  doChangeStatus: (values) => async (dispatch) => {
    try {
      dispatch({
        type: bundleListActions.CHANGE_STATUS_STARTED,
      });

      await BundleService.changeStatus(values);

      dispatch({
        type: bundleListActions.CHANGE_STATUS_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: bundleListActions.CHANGE_STATUS_ERROR,
      });
    }
  },

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: bundleListActions.DESTROY_STARTED,
      });

      await BundleService.delete(id);

      dispatch({
        type: bundleListActions.DESTROY_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: bundleListActions.DESTROY_ERROR,
      });
    }
  },
};

export default bundleListActions;
