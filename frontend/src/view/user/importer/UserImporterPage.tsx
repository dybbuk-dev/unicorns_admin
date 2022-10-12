import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import actions from 'src/modules/user/importer/userImporterActions';
import fields from 'src/modules/user/importer/userImporterFields';
import selectors from 'src/modules/user/importer/userImporterSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import importerHoc from 'src/view/shared/importer/Importer';

const Importer = importerHoc(
  selectors,
  actions,
  fields,
  i18n('user.importer.hint'),
);

function UserImportPage(props) {
  return (
    <>
      <Card>
        <MDBox px={3} pt={3}>
          <MDBox
            pb={3}
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h3">
              {i18n('user.importer.title')}
            </MDTypography>
          </MDBox>
        </MDBox>
        <Importer />
      </Card>
    </>
  );
}

export default UserImportPage;
