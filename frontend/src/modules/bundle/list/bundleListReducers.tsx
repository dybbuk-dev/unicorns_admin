import actions from 'src/modules/bundle/list/bundleListActions';

const initialData = {
  status: false,
  bundles: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FETCH_STARTED) {
    return {
      ...state,
    };
  }

  if (type === actions.FETCH_SUCCESS) {
    return {
      ...state,
      status: true,
      bundles: payload,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      status: false,
    };
  }

  return state;
};
