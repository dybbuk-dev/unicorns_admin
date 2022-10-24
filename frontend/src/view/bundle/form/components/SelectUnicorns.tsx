import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import typography from 'src/mui/assets/theme/base/typography';
import colors from 'src/mui/assets/theme/base/colors';
import Card from 'src/view/bundle/form/components/Card';
import ImageCheckbox from 'src/view/bundle/form/components/ImageCheckbox';
import CachedIcon from '@mui/icons-material/Cached';

function SelectUnicorns(props) {
  let { unicorns, visible } = props;

  return (
    <MDBox px={1} display={visible ? 'block' : 'none'}>
      <Grid spacing={3} container>
        <Grid item xs={12}>
          <MDBox pt={3}>
            <MDTypography variant="h3" color="dark">
              {i18n('bundle.create.selectUnicorns')}
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
                {i18n('bundle.create.description2')}
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
        {unicorns !== null
          ? unicorns.map((unicorn, i) => (
              <Grid item key={i}>
                <ImageCheckbox
                  checked={unicorn.checked}
                  onChange={(checked) =>
                    props.onChange(checked, unicorn.tokenId)
                  }
                  icon={
                    <Card
                      image={unicorn.image}
                      title={unicorn.title}
                      mt="12px"
                    />
                  }
                  checkedIcon={
                    <Card
                      image={unicorn.image}
                      title={unicorn.title}
                      isChecked
                      mt="12px"
                    />
                  }
                />
              </Grid>
            ))
          : null}
      </Grid>
    </MDBox>
  );
}

export default SelectUnicorns;
