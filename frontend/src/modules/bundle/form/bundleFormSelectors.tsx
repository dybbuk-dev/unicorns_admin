import { createSelector } from 'reselect';

const selectForm = (state) => state.bundle.form;

const selectIsCreated = createSelector(
  [selectForm],
  (form) => form.isCreated,
);

const selectInitLoading = createSelector(
  [selectForm],
  (form) => Boolean(form.nftLoading && form.tokenLoading),
);

const selectSaveLoading = createSelector(
  [selectForm],
  (form) => Boolean(form.saveLoading),
);

const selectNfts = createSelector(
  [selectForm],
  (form) => form.nfts,
);

const selectTokens = createSelector(
  [selectForm],
  (form) => form.tokens,
);

const bundleFormSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectIsCreated,
  selectForm,
  selectNfts,
  selectTokens,
};

export default bundleFormSelectors;
