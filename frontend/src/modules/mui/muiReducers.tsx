import actions from 'src/modules/mui/muiActions';

interface StateTypes {
  miniSidenav: boolean;
  fixedNavbar: boolean;
  layout: 'dashboard' | 'page' | '';
}

const initialState: StateTypes = {
  miniSidenav: false,
  fixedNavbar: true,
  layout: '',
};

export default (
  state = initialState,
  { type, value, payload },
) => {
  if (type === actions.INIT_SET) {
    return {
      ...state,
      ...initialState,
    };
  }

  if (type === actions.MINI_SIDENAV) {
    return {
      ...state,
      miniSidenav: value,
    };
  }

  if (type === actions.FIXED_NAVBAR) {
    return {
      ...state,
      fixedNavbar: value,
    };
  }

  if (type === actions.LAYOUT) {
    return {
      ...state,
      layout: value,
    };
  }

  return state;
};
