import { useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@mui/material';

function ImageCheckbox(props) {
  let { icon, checkedIcon } = props;
  const [checked, setChecked] = useState(props.checked);

  return (
    <>
      <Checkbox
        checked={checked}
        icon={icon}
        checkedIcon={checkedIcon}
        onChange={(e) => {
          setChecked(Boolean(e.target.checked));
          props.onChange &&
            props.onChange(e.target.checked);
        }}
        sx={{
          p: 0,
          m: 0,
        }}
      />
    </>
  );
}

ImageCheckbox.propTypes = {
  icon: PropTypes.node,
  checkedIcon: PropTypes.node,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

export default ImageCheckbox;
