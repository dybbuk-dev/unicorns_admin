import React from 'react';
import { i18n } from 'src/i18n';
import BundleListFilter from 'src/view/bundle/list/BundleListFilter';
import BundleListTable from 'src/view/bundle/list/BundleListTable';
import BundleListToolbar from 'src/view/bundle/list/BundleListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function BundleListPage(props) {
  return (
    <>
      <Card>
        <MDBox pt={3} px={3}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h3">
              {i18n('entities.bundle.list.title')}
            </MDTypography>

            <BundleListToolbar />
          </MDBox>
          <BundleListFilter />
        </MDBox>
        <BundleListTable />
      </Card>
    </>
  );
}

export default BundleListPage;
