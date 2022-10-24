import { raw } from 'express';
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

const selectTokens = createSelector(
  [selectRaw],
  (raw) => raw.tokens,
);

const selectNftStatus = createSelector(
  [selectRaw],
  (raw) => raw.nftStatus,
);

const selectTokenStatus = createSelector(
  [selectRaw],
  (raw) => raw.tokenStatus,
);

const bundleFormSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectRecord,
  selectStatus,
  selectRaw,
  selectNfts,
  selectTokens,
  selectNftStatus,
  selectTokenStatus,
};

export default bundleFormSelectors;
