import { createSelector } from 'reselect';

const selectRaw = (state) => state.bundle.list;

const selectStatus = createSelector(
  [selectRaw],
  (raw) => raw.status,
);

const selectBundles = createSelector(
  [selectRaw],
  (raw) => raw.bundles,
);

const bundleListSelectors = {
  selectStatus,
  selectBundles,
};

export default bundleListSelectors;
