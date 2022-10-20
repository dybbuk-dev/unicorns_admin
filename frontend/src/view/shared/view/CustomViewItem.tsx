import PropTypes from 'prop-types';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import NoViewItem from 'src/view/shared/view/NoViewItem';

function CustomViewItem(props) {
  const isBlank =
    (!props.value &&
      props.value !== 0 &&
      props.value !== false) ||
    (Array.isArray(props.value) && !props.value.length);

  if (isBlank) {
    return <NoViewItem {...props} />;
  }

  return (
    <MDBox
      pt={props.hiddenLabel ? 0 : 2}
      sx={{
        position: 'relative',
      }}
    >
      {!props.hiddenLabel && (
        <MDTypography
          variant="caption"
          color="secondary"
          fontWeight="regular"
          sx={{
            lineHeight: 1,
            position: 'absolute',
            top: 0,
          }}
        >
          {props.label}
        </MDTypography>
      )}
      {props.render(props.value)}
    </MDBox>
  );
}

CustomViewItem.defaultProps = {
  hiddenLabel: false,
};

CustomViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  hiddenLabel: PropTypes.bool,
  render: PropTypes.func,
};

export default CustomViewItem;
