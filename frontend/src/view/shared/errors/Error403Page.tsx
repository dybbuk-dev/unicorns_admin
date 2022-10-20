import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import selectors from 'src/modules/auth/authSelectors';
import MDButton from 'src/mui/components/MDButton';
import { Card } from '@mui/material';
import { BrandLogo } from 'src/assets/resources';
import MDBox from 'src/mui/components/MDBox';
import BasicLayout from 'src/view/shared/layout/BasicLayout';
import MDTypography from 'src/mui/components/MDTypography';
import { useSelector } from 'react-redux';

const Error403Page = () => {
  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );
  return (
    <>
      <BasicLayout
        image={backgroundImageUrl || '/images/403.svg'}
      >
        <Card>
          <MDBox
            variant="gradient"
            bgcolor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDBox
              display="flex"
              justifyContent="center"
              py={2}
            >
              <BrandLogo width="80%" />
            </MDBox>
          </MDBox>
          <MDBox pt={4} pb={4} px={3}>
            <MDTypography variant="h3" textAlign="center">
              403
            </MDTypography>
            <MDTypography
              variant="h6"
              textAlign="center"
              my={3}
            >
              {i18n('errors.403')}
            </MDTypography>
            <MDButton
              component={Link}
              to="/"
              variant="gradient"
              color="purple"
              type="button"
              fullWidth
              circular
            >
              {i18n('errors.backToHome')}
            </MDButton>
          </MDBox>
        </Card>
      </BasicLayout>
    </>
  );
};

export default Error403Page;
