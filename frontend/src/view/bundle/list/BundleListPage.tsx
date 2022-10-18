import { i18n } from 'src/i18n';
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
          <MDBox mb={3}>
            <MDTypography variant="h3">
              {i18n('bundle.list.title')}
            </MDTypography>
          </MDBox>
          <BundleListToolbar />
        </MDBox>
        <MDBox px={3}>
          <BundleListTable />
        </MDBox>
      </Card>
    </>
  );
}

export default BundleListPage;
