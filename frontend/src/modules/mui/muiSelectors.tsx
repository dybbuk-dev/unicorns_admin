import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const selectRaw = (state) => state.mui;

const selectMiniSidenav = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.miniSidenav),
);

const selectFixedNavbar = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.fixedNavbar),
);

const selectLayout = createSelector(
  [selectRaw],
  (raw) => raw.layout,
);

const muiSelectors = {
  selectRaw,
  selectMiniSidenav,
  selectFixedNavbar,
  selectLayout,
};

export default muiSelectors;

export function selectMuiSettings() {
  return {
    miniSidenav: useSelector(
      muiSelectors.selectMiniSidenav,
    ),
    fixedNavbar: useSelector(
      muiSelectors.selectFixedNavbar,
    ),
    layout: useSelector(muiSelectors.selectLayout),
  };
}
