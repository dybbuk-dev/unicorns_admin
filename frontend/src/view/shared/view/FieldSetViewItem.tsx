import { grey } from '@mui/material/colors';
import { Grid } from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

function FieldSetViewItem(props) {
  const { children, description, label, noContainer } =
    props;
  const { darkMode } = selectMuiSettings();
  const render = () => (
    <Grid spacing={2} container>
      {(label || description) && (
        <Grid item xs={12}>
          <MDBox
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
          >
            <MDTypography
              variant="h6"
              color="text"
              textTransform="capitalize"
              mr={2}
            >
              {label}
            </MDTypography>
            <MDTypography
              variant="caption"
              color="text"
              fontWeight="regular"
            >
              {description}
            </MDTypography>
          </MDBox>
        </Grid>
      )}
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
  return noContainer ? (
    render()
  ) : (
    <MDBox
      p={3}
      border={`1px solid ${grey[darkMode ? 700 : 300]}`}
      borderRadius="md"
    >
      {render()}
    </MDBox>
  );
}

FieldSetViewItem.defaultProps = {
  noContainer: false,
};

FieldSetViewItem.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  description: PropTypes.string,
  noContainer: PropTypes.bool,
};

export default FieldSetViewItem;
