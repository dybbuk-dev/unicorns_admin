import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/bundle/form/bundleFormActions';
import selectors from 'src/modules/bundle/form/bundleFormSelectors';
import BundleForm from 'src/view/bundle/form/BundleForm';
import { getHistory } from 'src/modules/store';
import Spinner from 'src/view/shared/Spinner';
import { Grid } from '@mui/material';
import SpinnerModal from 'src/view/shared/modals/SpinnerModal';
import MDBox from 'src/mui/components/MDBox';

function BundleFormPage(props) {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  useEffect(() => {
    dispatch(actions.doGetNFTs());
    dispatch(actions.doGetTokens());
  }, [dispatch]);

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );
  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );
  const nfts = useSelector(selectors.selectNfts);
  const tokens = useSelector(selectors.selectTokens);

  const isEditing = Boolean(match.params.id);

  const title = isEditing
    ? i18n('bundle.edit.title')
    : i18n('bundle.create.title');

  const doSubmit = (id, data) => {
    dispatch(actions.doCreate(data));
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        {initLoading && (
          <MDBox my="100px">
            <Spinner size={80} />
          </MDBox>
        )}

        {!initLoading && (
          <BundleForm
            title={title}
            saveLoading={saveLoading}
            nfts={nfts}
            tokens={tokens}
            onSubmit={doSubmit}
            onCancel={() => getHistory().push('/bundle')}
          />
        )}
      </Grid>

      {saveLoading && <SpinnerModal />}
    </Grid>
  );
}

export default BundleFormPage;
