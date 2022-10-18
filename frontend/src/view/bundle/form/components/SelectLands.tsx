import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import CachedIcon from '@mui/icons-material/Cached';
import MDTypography from 'src/mui/components/MDTypography';
import typography from 'src/mui/assets/theme/base/typography';
import colors from 'src/mui/assets/theme/base/colors';
import Card from 'src/view/bundle/form/components/Card';
import ImageCheckboxFormItem from 'src/view/shared/form/items/ImageCheckboxFormItem';

function SelectLands(props) {
  return (
    <MDBox
      px={1}
      display={props.visible ? 'block' : 'none'}
    >
      <Grid spacing={3} container>
        <Grid item xs={12}>
          <MDBox pt={3}>
            <MDTypography variant="h3" color="dark">
              {i18n('bundle.create.selectLands')}
            </MDTypography>
            <MDBox
              pt={2}
              display="flex"
              alignItems="center"
            >
              <MDTypography
                sx={{
                  pr: '16px',
                  fontStyle: typography.body2,
                  color: colors.text.main,
                  fontWeight: typography.fontWeightRegular,
                }}
              >
                {i18n('bundle.create.description3')}
              </MDTypography>
              <MDButton
                variant="outlined"
                color="purple"
                type="button"
                startIcon={<CachedIcon />}
                size="small"
                circular
              >
                {i18n('common.refresh')}
              </MDButton>
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
        my="15px"
      >
        {[...Array(10)].map((e, i) => (
          <Grid item key={i}>
            <ImageCheckboxFormItem
              name={`land${i + 1}`}
              icon={<Card index={i} mt="12px" />}
              checkedIcon={
                <Card index={i} isChecked mt="12px" />
              }
            />
          </Grid>
        ))}
      </Grid>
    </MDBox>
  );
}

export default SelectLands;
