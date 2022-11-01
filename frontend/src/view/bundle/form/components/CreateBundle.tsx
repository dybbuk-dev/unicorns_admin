import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import typography from 'src/mui/assets/theme/base/typography';
import colors from 'src/mui/assets/theme/base/colors';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';

function CreateBundle(props) {
  return (
    <MDBox
      px={1}
      display={props.visible ? 'block' : 'none'}
    >
      <Grid spacing={3} container>
        <Grid item xs={12}>
          <MDBox pt={3}>
            <MDTypography variant="h3" color="dark">
              {props.title}
            </MDTypography>
            <MDTypography
              sx={{
                paddingTop: 2,
                fontStyle: typography.body2,
                color: colors.text.main,
                fontWeight: typography.fontWeightRegular,
              }}
            >
              {i18n('bundle.create.description1')}
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <InputFormItem
            name="name"
            label={i18n('bundle.fields.name')}
            disabled
            variant="standard"
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <DatePickerFormItem
            name="expirationDate"
            label={i18n('bundle.fields.expiration')}
            variant="standard"
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <InputFormItem
            name="UNIM"
            label={i18n('bundle.fields.UNIM')}
            required={true}
            variant="standard"
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <InputFormItem
            name="RBW"
            label={i18n('bundle.fields.RBW')}
            required={true}
            variant="standard"
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default CreateBundle;
