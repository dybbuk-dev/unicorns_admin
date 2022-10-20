import PropTypes from 'prop-types';
import React from 'react';
import FilesUploader from 'src/view/shared/uploaders/FilesUploader';
import MDBox from 'src/mui/components/MDBox';
import NoViewItem from 'src/view/shared/view/NoViewItem';
import MDTypography from 'src/mui/components/MDTypography';

function FilesViewItem(props) {
  const valueAsArray = () => {
    const { value } = props;

    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  };

  if (!valueAsArray().length) {
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
      <FilesUploader readonly value={valueAsArray()} />
    </MDBox>
  );
}

FilesViewItem.defaultProps = {
  hiddenLabel: false,
};

FilesViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  hiddenLabel: PropTypes.bool,
};

export default FilesViewItem;
