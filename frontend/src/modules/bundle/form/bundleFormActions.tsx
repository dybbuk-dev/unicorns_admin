import BundleService from 'src/modules/bundle/bundleService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'BUNDLE_FORM';

const bundleFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  GET_NFT_STARTED: `${prefix}_GET_NFT_STARTED`,
  GET_NFT_SUCCESS: `${prefix}_GET_NFT_SUCCESS`,
  GET_NFT_ERROR: `${prefix}_GET_NFT_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: bundleFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await BundleService.find(id);
      }

      dispatch({
        type: bundleFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: bundleFormActions.INIT_ERROR,
      });

      getHistory().push('/bundle');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: bundleFormActions.CREATE_STARTED,
      });

      await BundleService.create(values);

      dispatch({
        type: bundleFormActions.CREATE_SUCCESS,
      });

      getHistory().push('/bundle/result/success');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: bundleFormActions.CREATE_ERROR,
      });

      getHistory().push('/bundle/result/failed');
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: bundleFormActions.UPDATE_STARTED,
      });

      await BundleService.update(id, values);

      dispatch({
        type: bundleFormActions.UPDATE_SUCCESS,
      });

      Message.success(i18n('bundle.update.success'));

      getHistory().push('/bundle');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: bundleFormActions.UPDATE_ERROR,
      });
    }
  },

  doGetNFT: () => async (dispatch) => {
    try {
      dispatch({
        type: bundleFormActions.GET_NFT_STARTED,
      });

      let nfts = await BundleService.listNFT();

      dispatch({
        type: bundleFormActions.GET_NFT_SUCCESS,
        payload: nfts,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: bundleFormActions.GET_NFT_ERROR,
      });
    }
  },
};

export default bundleFormActions;
