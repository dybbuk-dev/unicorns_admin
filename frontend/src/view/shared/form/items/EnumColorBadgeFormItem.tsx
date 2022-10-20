import PropTypes from 'prop-types';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import EnumColorBadgeViewItem from 'src/view/shared/view/EnumColorBadgeViewItem';

function EnumColorBadgeFormItem(props) {
  const { name, value, label } = props;
  return (
    <MDBox
      pt={2}
      sx={{
        position: 'relative',
      }}
    >
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
        {label}
      </MDTypography>
      <EnumColorBadgeViewItem {...props} label={null} />
      <MDBox display="none">
        <InputFormItem name={name} value={value} />
      </MDBox>
    </MDBox>
  );
}

EnumColorBadgeFormItem.propsType = {
  colors: PropTypes.array.isRequired,
  enums: PropTypes.array.isRequired,
  i18nPrefix: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default EnumColorBadgeFormItem;
