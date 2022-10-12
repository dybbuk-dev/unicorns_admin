import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import colors from 'src/mui/assets/theme/base/colors';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// Declaring prop types for DefaultStatisticsCard
interface Props {
  title: string;
  count: string | number;
  detail: string | number;
  isValue?: boolean;
  [key: string]: any;
}

function StatisticsCard({
  title,
  count,
  detail,
  isValue,
}: Props): JSX.Element {
  return (
    <Card>
      <MDBox
        p={2}
        bgcolor={
          isValue ? colors.purple.main : colors.light.main
        }
        borderRadius="10px"
      >
        <MDBox mb={0.5} lineHeight={1}>
          <MDTypography
            variant="button"
            fontWeight="regular"
            color={isValue ? 'white' : 'text'}
            textTransform="capitalize"
          >
            {title}
          </MDTypography>
        </MDBox>
        <MDBox lineHeight={1} pt={1}>
          <Grid container>
            <Grid item xs={7}>
              <MDTypography
                variant="h3"
                fontWeight="bold"
                color={isValue ? 'white' : 'dark'}
              >
                {count}
              </MDTypography>
            </Grid>
            <Grid item xs={5}>
              <MDTypography
                variant="h6"
                color={isValue ? 'white' : 'text'}
                fontWeight="regular"
                pt={1}
              >
                {detail}
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default StatisticsCard;
