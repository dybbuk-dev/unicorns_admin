import { createSelector } from 'reselect';

const selectList = (state) => state.bundle.list;

const selectBundles = createSelector(
  [selectList],
  (list) => list.bundles,
);

const selectLoading = createSelector([selectList], (list) =>
  Boolean(list.loading),
);

const selectHasBundles = createSelector(
  [selectBundles],
  (bundles) => Boolean(bundles.length > 0),
);

const bundleListSelectors = {
  selectBundles,
  selectLoading,
  selectHasBundles,
};

export default bundleListSelectors;
