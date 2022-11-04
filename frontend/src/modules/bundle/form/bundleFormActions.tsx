import BundleService from 'src/modules/bundle/bundleService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'BUNDLE_FORM';

const bundleFormActions = {
  RESET: `${prefix}_RESET`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  GET_NFTS_STARTED: `${prefix}_GET_NFT_STARTED`,
  GET_NFTS_SUCCESS: `${prefix}_GET_NFT_SUCCESS`,
  GET_NFTS_ERROR: `${prefix}_GET_NFT_ERROR`,

  GET_TOKENS_STARTED: `${prefix}_GET_TOKENS_STARTED`,
  GET_TOKENS_SUCCESS: `${prefix}_GET_TOKENS_SUCCESS`,
  GET_TOKENS_ERROR: `${prefix}_GET_TOKENS_ERROR`,

  doReset: () => async (dispatch) => {
    dispatch({
      type: bundleFormActions.RESET,
    });
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: bundleFormActions.CREATE_STARTED,
      });

      const response = await BundleService.createBundle(
        values,
      );

      await response.wait();

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
