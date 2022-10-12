import { ConnectedRouter } from 'connected-react-router';
import {
  configureStore,
  getHistory,
} from 'src/modules/store';
import { useState, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import RoutesComponent from 'src/view/shared/routes/RoutesComponent';
import 'typeface-roboto';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Message from 'src/view/shared/message';
import {
  useLocation,
  useRouteMatch,
} from 'react-router-dom';

// @mui material components
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from 'src/mui/assets/theme';

import muiActions from 'src/modules/mui/muiActions';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import Menu from 'src/view/layout/Menu';

const store = configureStore();

export default function App(props) {
  return (
    <Provider store={store}>
      <AppWithRedux {...props} />
    </Provider>
  );
}

function AppWithRedux(props) {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <>
          <CssBaseline />
          <AppWithSnackbar {...props} />
        </>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

function AppWithSnackbar(props) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // this is a little hack to not have to import notistack
    // on all the components that emit messages
    Message.registerNotistakEnqueueSnackbar(
      enqueueSnackbar,
    );
  }, [enqueueSnackbar]);

  const { miniSidenav, layout } = selectMuiSettings();

  const dispatch = useDispatch();

  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      dispatch(muiActions.doMiniSidenav(false));
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      dispatch(muiActions.doMiniSidenav(true));
      setOnMouseEnter(false);
    }
  };

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const match = useRouteMatch();

  return (
    <ConnectedRouter history={getHistory()}>
      {layout === 'dashboard' && (
        <>
          <Menu
            url={match.url}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        </>
      )}
      <RoutesComponent />
    </ConnectedRouter>
  );
}
