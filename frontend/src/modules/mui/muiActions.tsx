const prefix = 'MUI_ACTIONS';

const muiActions = {
  INIT_SET: `${prefix}_INIT_SET`,

  MINI_SIDENAV: `MINI_SIDENAV`,
  FIXED_NAVBAR: `FIXED_NAVBAR`,
  LAYOUT: `LAYOUT`,

  doMiniSidenav: (value) => {
    return {
      type: muiActions.MINI_SIDENAV,
      value: value,
    };
  },

  doFixedNavbar: (value) => {
    return {
      type: muiActions.FIXED_NAVBAR,
      value: value,
    };
  },

  doLayout: (value) => {
    return {
      type: muiActions.LAYOUT,
      value: value,
    };
  },

  doInit: () => {
    return {
      type: muiActions.INIT_SET,
    };
  },
};

export default muiActions;
