import actions from 'src/modules/bundle/form/bundleFormActions';

const initialData = {
  initLoading: false,
  nftLoading: false,
  saveLoading: false,
  record: null,
  status: null,
  nftStatus: null,
  nfts: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.INIT_STARTED) {
    return {
      ...state,
      record: null,
      initLoading: true,
    };
  }

  if (type === actions.INIT_SUCCESS) {
    return {
      ...state,
      record: payload,
      initLoading: false,
    };
  }

  if (type === actions.INIT_ERROR) {
    return {
      ...state,
      record: null,
      initLoading: false,
    };
  }

  if (type === actions.CREATE_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.CREATE_SUCCESS) {
    return {
      ...state,
      status: 'success',
      saveLoading: false,
    };
  }

  if (type === actions.CREATE_ERROR) {
    return {
      ...state,
      status: 'failed',
      saveLoading: false,
    };
  }

  if (type === actions.UPDATE_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.UPDATE_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.UPDATE_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.GET_NFT_STARTED) {
    return {
      ...state,
      nftLoading: true,
    };
  }

  if (type === actions.GET_NFT_SUCCESS) {
    return {
      ...state,
      nfts: payload,
      nftStatus: 'success',
      nftLoading: false,
    };
  }

  if (type === actions.GET_NFT_ERROR) {
    return {
      ...state,
      nftStatus: 'failed',
      nftLoading: false,
    };
  }

  return state;
};
