import { createSelector } from 'reselect';

const selectRaw = (state) => state.bundle.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const bundleDestroySelectors = {
  selectLoading,
};

export default bundleDestroySelectors;
