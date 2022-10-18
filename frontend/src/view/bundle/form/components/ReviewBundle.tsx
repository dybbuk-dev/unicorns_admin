import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import typography from 'src/mui/assets/theme/base/typography';
import colors from 'src/mui/assets/theme/base/colors';
import Card from 'src/view/bundle/form/components/Card';
import moment from 'moment';

function ReivewBundle(props) {
  const { values, visible } = props;
  return (
    <MDBox px={1} display={visible ? 'block' : 'none'}>
      <Grid spacing={3} container>
        <Grid item xs={12}>
          <MDBox pt={3}>
            <MDTypography variant="h3" color="dark">
              {i18n('bundle.create.reviewBundle')}
            </MDTypography>
            <MDTypography
              sx={{
                paddingTop: 2,
                fontStyle: typography.body2,
                color: colors.text.main,
                fontWeight: typography.fontWeightRegular,
              }}
            >
              {i18n('bundle.create.description4')}
            </MDTypography>
          </MDBox>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={1}
        bgcolor="grey.200"
        borderRadius="6px"
        pb={1}
        pr={1}
        mt={4}
      >
        <Grid item md={4} sm={12}>
          <MDBox
            display="flex"
            borderRadius="10px"
            border={1}
            borderColor="grey.400"
            bgcolor="#ffffff"
            pl={1}
          >
            <img
              src="/images/tokens/UNIM.svg"
              width="50px"
              alt="UNIM"
            />
            <MDBox pl="20px" py="10px">
              <MDTypography
                sx={{
                  fontWeight: 500,
                  color: colors.dark,
                  fontSize: 16,
                }}
              >
                $UNIM tokens
              </MDTypography>
              <MDTypography
                sx={{
                  lineHeight: 1.0,
                  fontWeight: 700,
                  color: colors.dark,
                  fontSize: 16,
                }}
              >
                {values.UNIM}
              </MDTypography>
            </MDBox>
          </MDBox>
        </Grid>
        <Grid item md={4} sm={12}>
          <MDBox
            display="flex"
            borderRadius="10px"
            border={1}
            borderColor="grey.400"
            bgcolor="#ffffff"
            pl={1}
          >
            <img
              src="/images/tokens/RBW.svg"
              width="50px"
              alt="RBW"
            />
            <MDBox pl="20px" py="10px">
              <MDTypography
                sx={{
                  fontWeight: 500,
                  color: colors.dark,
                  fontSize: 16,
                }}
              >
                $RBW tokens
              </MDTypography>
              <MDTypography
                sx={{
                  lineHeight: 1.0,
                  fontWeight: 700,
                  color: colors.dark,
                  fontSize: 16,
                }}
              >
                {values.RBW}
              </MDTypography>
            </MDBox>
          </MDBox>
        </Grid>
        <Grid item md={4} sm={12}>
          <MDBox
            display="flex"
            borderRadius="10px"
            border={1}
            borderColor="grey.400"
            bgcolor="#ffffff"
            pl={1}
          >
            <img
              src="/images/calendar.svg"
              width="50px"
              alt="Calendar"
            />
            <MDBox pl="20px" py="10px">
              <MDTypography
                sx={{
                  fontWeight: 500,
                  color: colors.dark,
                  fontSize: 16,
                }}
              >
                Expiration date
              </MDTypography>
              <MDTypography
                sx={{
                  lineHeight: 1.0,
                  fontWeight: 700,
                  color: colors.dark,
                  fontSize: 16,
                }}
              >
                {moment(values.expirationDate).format(
                  'MM/DD/YYYY',
                )}
              </MDTypography>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={1}
        bgcolor="grey.200"
        borderRadius="6px"
        pb={1}
        pr={1}
        mt={4}
      >
        {[...Array(10)].map((e, i) =>
          eval(`values.unicorn${i + 1}`) ? (
            <Grid item key={i}>
              <Card index={i} isGeneral isUnicorn />
            </Grid>
          ) : null,
        )}
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={1}
        bgcolor="grey.200"
        borderRadius="6px"
        pb={1}
        pr={1}
        mt={4}
        mb={1}
      >
        {[...Array(10)].map((e, i) =>
          eval(`values.land${i + 1}`) ? (
            <Grid item key={i}>
              <Card index={i} isGeneral />
            </Grid>
          ) : null,
        )}
      </Grid>
    </MDBox>
  );
}

export default ReivewBundle;
