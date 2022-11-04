import actions from 'src/modules/bundle/form/bundleFormActions';

const initialData = {
  saveLoading: false,
  nftLoading: false,
  tokenLoading: false,
  isCreated: false,
  nfts: [],
  tokens: [],
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.RESET) {
    return {
      ...initialData,
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
      isCreated: true,
      saveLoading: false,
    };
  }

  if (type === actions.CREATE_ERROR) {
    return {
      ...state,
      isCreated: false,
      saveLoading: false,
    };
  }

  if (type === actions.GET_NFTS_STARTED) {
    return {
      ...state,
      nftLoading: true,
    };
  }

  if (type === actions.GET_NFTS_SUCCESS) {
    return {
      ...state,
      nfts: payload,
      nftLoading: false,
    };
  }

  if (type === actions.GET_NFTS_ERROR) {
    return {
      ...state,
      nfts: [],
      nftLoading: false,
    };
  }

  if (type === actions.GET_TOKENS_STARTED) {
    return {
      ...state,
      tokenLoading: true,
    };
  }

  if (type === actions.GET_TOKENS_SUCCESS) {
    return {
      ...state,
      tokens: payload,
      tokenLoading: false,
    };
  }

  if (type === actions.GET_TOKENS_ERROR) {
    return {
      ...state,
      tokens: [],
      tokenLoading: false,
    };
  }

  return state;
};
