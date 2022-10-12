import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';
import MDBox from 'src/mui/components/MDBox';
import MDInput from 'src/mui/components/MDInput';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

export function InputNumberFormItem(props) {
  const {
    autoComplete,
    autoFocus,
    disabled,
    endAdornment,
    externalErrorMessage,
    forceValue,
    fullWidth,
    hint,
    id,
    label,
    margin,
    name,
    placeholder,
    required,
    shrink,
    size,
    startAdornment,
    type,
    value,
    variant,
  } = props;

  const {
    register,
    errors,
    formState: { touched, isSubmitted },
    setValue,
    control: { defaultValuesRef },
    getValues,
  } = useFormContext();

  const defaultValues = defaultValuesRef.current || {};

  const formValue = getValues(name);

  const [curValue, setCurValue] = useState(
    formValue || value || defaultValues[name] || '',
  );

  if (forceValue) {
    setValue(name, value, {
      shouldValidate: false,
      shouldDirty: true,
    });
  }

  useEffect(() => {
    register({ name });
  }, [register, name]);

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  return (
    <>
      <MDInput
        id={name}
        name={name}
        type={type}
        label={label}
        required={required}
        // inputRef={register}
        onChange={(event) => {
          if (!forceValue) {
            setValue(name, event.target.value, {
              shouldValidate: false,
              shouldDirty: true,
            });
          }
          setCurValue(event.target.value);
          props.onChange &&
            props.onChange(event.target.value);
        }}
        onBlur={(event) => {
          props.onBlur && props.onBlur(event);
        }}
        margin={margin}
        fullWidth
        variant={variant}
        size={size}
        placeholder={placeholder || undefined}
        autoFocus={autoFocus || undefined}
        autoComplete={autoComplete || undefined}
        InputLabelProps={{
          shrink: shrink,
        }}
        error={Boolean(errorMessage)}
        helperText={hint}
        InputProps={{ startAdornment, endAdornment }}
        inputProps={{
          name,
        }}
        disabled={disabled}
        value={forceValue ? value : formValue || curValue}
      />
      {errorMessage && (
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            {errorMessage}
          </MDTypography>
        </MDBox>
      )}
    </>
  );
}

InputNumberFormItem.defaultProps = {
  forceValue: false,
  required: false,
  type: 'number',
};

InputNumberFormItem.propTypes = {
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  endAdornment: PropTypes.any,
  externalErrorMessage: PropTypes.string,
  forceValue: PropTypes.bool,
  fullWidth: PropTypes.bool,
  hint: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  margin: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  prefix: PropTypes.string,
  required: PropTypes.bool,
  shrink: PropTypes.bool,
  size: PropTypes.string,
  startAdornment: PropTypes.any,
  type: PropTypes.string,
  value: PropTypes.string,
  variant: PropTypes.string,
};

export default InputNumberFormItem;
