import { createSelector } from 'reselect';

const selectRaw = (state) => state.bundle.form;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectStatus = createSelector(
  [selectRaw],
  (raw) => raw.status,
);

const selectInitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.initLoading),
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const bundleFormSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectRecord,
  selectStatus,
  selectRaw,
};

export default bundleFormSelectors;
