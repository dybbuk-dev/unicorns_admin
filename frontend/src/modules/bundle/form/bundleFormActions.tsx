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

  GET_NFTS_STARTED: `${prefix}_GET_NFT_STARTED`,
  GET_NFTS_SUCCESS: `${prefix}_GET_NFT_SUCCESS`,
  GET_NFTS_ERROR: `${prefix}_GET_NFT_ERROR`,

  GET_TOKENS_STARTED: `${prefix}_GET_TOKENS_STARTED`,
  GET_TOKENS_SUCCESS: `${prefix}_GET_TOKENS_SUCCESS`,
  GET_TOKENS_ERROR: `${prefix}_GET_TOKENS_ERROR`,

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

      await BundleService.createBundle(values);

      dispatch({
        type: bundleFormActions.CREATE_SUCCESS,
      });

      getHistory().push('/bundle');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: bundleFormActions.CREATE_ERROR,
      });

      getHistory().push('/bundle');
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

  doGetNFTs: () => async (dispatch) => {
    try {
      dispatch({
        type: bundleFormActions.GET_NFTS_STARTED,
      });

      let nfts = await BundleService.getNFTs();

      dispatch({
        type: bundleFormActions.GET_NFTS_SUCCESS,
        payload: nfts,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: bundleFormActions.GET_NFTS_ERROR,
      });
    }
  },

  doGetTokens: () => async (dispatch) => {
    try {
      dispatch({
        type: bundleFormActions.GET_TOKENS_STARTED,
      });

      let tokens = await BundleService.getTokens();

      dispatch({
        type: bundleFormActions.GET_TOKENS_SUCCESS,
        payload: tokens,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: bundleFormActions.GET_TOKENS_ERROR,
      });
    }
  },
};

export default bundleFormActions;
