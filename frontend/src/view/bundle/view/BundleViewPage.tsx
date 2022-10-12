import { Card } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/bundle/view/bundleViewActions';
import selectors from 'src/modules/bundle/view/bundleViewSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import BundleView from 'src/view/bundle/view/BundleView';
import BundleViewToolbar from 'src/view/bundle/view/BundleViewToolbar';

function BundlePage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      <Card>
        <MDBox py={3} px={3}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDBox
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
            >
              <MDTypography variant="h4">
                {i18n('entities.bundle.view.title')}
              </MDTypography>
            </MDBox>
            <BundleViewToolbar match={match} />
          </MDBox>

          <BundleView loading={loading} record={record} />
        </MDBox>
      </Card>
    </>
  );
}

export default BundlePage;
