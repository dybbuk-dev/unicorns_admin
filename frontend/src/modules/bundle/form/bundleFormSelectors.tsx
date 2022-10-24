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

const selectNfts = createSelector(
  [selectRaw],
  (raw) => raw.nfts,
);

const selectNftLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.nftLoading),
);

const selectNftStatus = createSelector(
  [selectRaw],
  (raw) => raw.nftStatus,
);

const bundleFormSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectNftLoading,
  selectRecord,
  selectStatus,
  selectRaw,
  selectNfts,
  selectNftStatus,
};

export default bundleFormSelectors;
