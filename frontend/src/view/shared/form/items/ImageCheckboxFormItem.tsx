import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormErrors from 'src/view/shared/form/formErrors';
import {
  FormControlLabel,
  FormHelperText,
  Checkbox,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';

export function ImageCheckboxFormItem(props) {
  const {
    externalErrorMessage,
    icon,
    checkedIcon,
    forceValue,
    onChange,
    hint,
    name,
    required,
    value,
  } = props;

  const {
    control: { defaultValuesRef },
    errors,
    formState: { touched, isSubmitted },
    getValues,
    register,
    setValue,
  } = useFormContext();

  const defaultValues = defaultValuesRef.current || {};

  const formValue = getValues(name);

  const [checked, setChecked] = useState(() => {
    if (formValue !== undefined && formValue !== null) {
      return formValue;
    }
    if (value !== undefined && value !== null) {
      return value;
    }
    if (
      defaultValues[name] !== undefined &&
      defaultValues[name] !== null
    ) {
      return defaultValues[name];
    }
    return false;
  });

  useEffect(() => {
    register({ name });
  }, [register, name]);

  useEffect(() => {
    if (forceValue) {
      setChecked(value);
    }
  }, [value]);

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  const formHelperText = errorMessage || hint;

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            id={name}
            name={name}
            checked={checked}
            icon={icon}
            checkedIcon={checkedIcon}
            onChange={(e) => {
              setChecked(Boolean(e.target.checked));
              setValue(name, Boolean(e.target.checked), {
                shouldValidate: false,
                shouldDirty: true,
              });
              props.onChange &&
                props.onChange(e.target.checked);
            }}
            onBlur={() =>
              props.onBlur && props.onBlur(null)
            }
            sx={{
              p: 0,
              m: 0,
            }}
          />
        }
        label=""
        sx={{
          p: 0,
          m: 0,
        }}
      />
      {formHelperText && (
        <FormHelperText style={{ marginTop: 0 }}>
          {formHelperText}
        </FormHelperText>
      )}
    </>
  );
}

ImageCheckboxFormItem.defaultProps = {
  forceValue: false,
};

ImageCheckboxFormItem.propTypes = {
  externalErrorMessage: PropTypes.string,
  icon: PropTypes.node,
  checkedIcon: PropTypes.node,
  forceValue: PropTypes.bool,
  hint: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.bool,
};

export default ImageCheckboxFormItem;
