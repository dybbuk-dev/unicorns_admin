import AddIcon from '@mui/icons-material/Add';
import { i18n } from 'src/i18n';
import bundleSelectors from 'src/modules/bundle/bundleSelectors';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';
import MDButton from 'src/mui/components/MDButton';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import typography from 'src/mui/assets/theme/base/typography';
import colors from 'src/mui/assets/theme/base/colors';

const union = '/images/union.svg';

function BundleToolbar(props) {
  const hasPermissionToCreate = useSelector(
    bundleSelectors.selectPermissionToCreate,
  );

  return (
    <ToolbarWrapper>
      <MDBox
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={2}
        py={1}
        mb={1}
        border={1}
        borderColor="grey.200"
        borderRadius="10px"
      >
        <MDBox display="flex">
          <img src={union} alt="Union" />
          <MDBox ml={1}>
            <MDTypography
              sx={{
                fontStyle: typography.body1,
                lineHeight: 1.4,
              }}
            >
              {i18n('bundle.list.product')}
            </MDTypography>
            <MDTypography
              sx={{
                fontStyle: typography.subtitle2,
                lineHeight: 1.25,
                color: colors.text.main,
              }}
            >
              {i18n('bundle.list.description')}
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox minWidth="170px" ml={2}>
          {hasPermissionToCreate && (
            <MDButton
              variant="gradient"
              color="purple"
              component={Link}
              to="/bundle/new"
              startIcon={<AddIcon />}
              size="small"
              circular
            >
              {i18n('bundle.create.title')}
            </MDButton>
          )}
        </MDBox>
      </MDBox>
    </ToolbarWrapper>
  );
}

export default BundleToolbar;
