import actions from 'src/modules/bundle/list/bundleListActions';

const initialData = {
  loading: false,
  bundles: [],
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FETCH_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.FETCH_SUCCESS) {
    return {
      ...state,
      loading: false,
      bundles: payload,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      loading: false,
      bundles: [],
    };
  }

  if (type === actions.CHANGE_STATUS_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.CHANGE_STATUS_SUCCESS) {
    return {
      ...state,
    };
  }

  if (type === actions.CHANGE_STATUS_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.DESTROY_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.DESTROY_SUCCESS) {
    return {
      ...state,
    };
  }

  if (type === actions.DESTROY_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  return state;
};
