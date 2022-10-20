import BundleService from 'src/modules/bundle/bundleService';
import selectors from 'src/modules/bundle/list/bundleListSelectors';
import Errors from 'src/modules/shared/error/errors';

const prefix = 'BUNDLE_LIST';

const bundleListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  doReset: () => async (dispatch) => {
    dispatch({
      type: bundleListActions.RESETED,
    });

    dispatch(bundleListActions.doFetch());
  },

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: bundleListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(bundleListActions.doFetchCurrentFilter());
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: bundleListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(bundleListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        bundleListActions.doFetch(filter, rawFilter, true),
      );
    },

  doFetch:
    (filter?, rawFilter?, keepPagination = false) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: bundleListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response = await BundleService.list(
          filter,
          selectors.selectOrderBy(getState()),
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: bundleListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
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
