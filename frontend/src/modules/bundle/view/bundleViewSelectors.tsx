import { createSelector } from 'reselect';

const selectRaw = (state) => state.bundle.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const bundleViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default bundleViewSelectors;
