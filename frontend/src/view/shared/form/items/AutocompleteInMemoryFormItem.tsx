import _uniqBy from 'lodash/uniqBy';
import { Autocomplete, Box } from '@mui/material';
import { i18n } from 'src/i18n';
import { useFormContext } from 'react-hook-form';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import FormErrors from 'src/view/shared/form/formErrors';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDInput from 'src/mui/components/MDInput';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

function AutocompleteInMemoryFormItem(props) {
  const {
    autoFocus,
    createButtonIcon,
    externalErrorMessage,
    fetchFn,
    fullWidth,
    getOptionDisabled,
    groupBy,
    hint,
    isClearable,
    label,
    mapper,
    margin,
    mode,
    name,
    placeholder,
    renderInput,
    renderOption,
    required,
    rerender,
    shrink,
    size,
    variant,
  } = props;

  const {
    errors,
    control: { defaultValuesRef },
    setValue,
    register,
    formState: { touched, isSubmitted },
    getValues,
  } = useFormContext();

  const defaultValues = defaultValuesRef.current || {};

  const formValue = getValues(name);

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  const originalValue = formValue || defaultValues[name];

  const [fullDataSource, setFullDataSource] = useState<
    Array<any>
  >([]);
  const [loading, setLoading] = useState(false);

  const [realValue, setRealValue] = useState(originalValue);

  useEffect(() => {
    register({ name });
  }, [register, name]);

  useEffect(() => {
    const fetchAllResults = async () => {
      setLoading(true);

      try {
        let fullDataSource = props.belongTo
          ? await fetchFn(props.belongTo)
          : await fetchFn();

        fullDataSource = fullDataSource.map((data) =>
          mapper.toAutocomplete(data),
        );

        setFullDataSource(fullDataSource);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setFullDataSource([]);
        setLoading(false);
        return [];
      }
    };

    fetchAllResults().then(() => {
      setRealValue(getValues(name) || defaultValues[name]);
      props.onChange &&
        props.onChange(
          prioritizeFromDataSource(
            getValues(name) ?? defaultValues[name] ?? {},
          ),
        );
    });
    // eslint-disable-next-line
  }, [rerender, props.belongTo]);

  const prioritizeFromDataSource = (selected) => {
    return (
      (fullDataSource || []).find(
        (item) => item.value === selected.value,
      ) || selected
    );
  };

  const value = () => {
    if (mode === 'multiple') {
      return valueMultiple();
    } else {
      return valueOne();
    }
  };

  const valueMultiple = () => {
    if (realValue) {
      return realValue.map((value) =>
        prioritizeFromDataSource(
          mapper.toAutocomplete(value),
        ),
      );
    }

    return [];
  };

  const valueOne = () => {
    if (realValue) {
      return prioritizeFromDataSource(
        mapper.toAutocomplete(realValue),
      );
    }

    return null;
  };

  const handleSelect = (value) => {
    if (mode === 'multiple') {
      return handleSelectMultiple(value);
    } else {
      return handleSelectOne(value);
    }
  };

  const handleSelectMultiple = (values) => {
    if (!values) {
      setRealValue([]);
      setValue(name, [], {
        shouldValidate: false,
        shouldDirty: true,
      });
      props.onChange && props.onChange([]);
      return;
    }

    const newValue = values.map((value) =>
      mapper.toValue(value),
    );
    setRealValue(newValue);
    setValue(name, newValue, {
      shouldValidate: false,
      shouldDirty: true,
    });
    props.onChange && props.onChange(newValue);
  };

  const handleSelectOne = (value) => {
    if (!value) {
      setRealValue(null);
      setValue(name, null, {
        shouldValidate: false,
        shouldDirty: true,
      });
      props.onChange && props.onChange(null);
      return;
    }

    const newValue = mapper.toValue(value);
    setRealValue(newValue);
    setValue(name, newValue, {
      shouldValidate: false,
      shouldDirty: true,
    });
    props.onChange && props.onChange(newValue);
  };

  const options = () => {
    const { mode } = props;

    if (!fullDataSource) {
      return [];
    }

    // Includes the selected value on the options
    if (value()) {
      if (mode === 'multiple') {
        return _uniqBy(
          [...fullDataSource, ...value()],
          'value',
        );
      } else {
        return _uniqBy(
          [...fullDataSource, value()],
          'value',
        );
      }
    }

    return fullDataSource;
  };

  const hintOrLoading = loading
    ? i18n('autocomplete.loading')
    : hint;

  const fnRenderInput = renderInput
    ? renderInput
    : (params) => (
        <MDInput
          {...params}
          required={required}
          margin={margin}
          variant={variant}
          size={size}
          InputLabelProps={{
            shrink: shrink,
          }}
          label={label}
          autoFocus={autoFocus || undefined}
        />
      );

  const fnDefaultRenderOption = (props, option) => (
    <Box
      component="li"
      {...props}
      {...{ key: `${option.id ?? ''}-${option.value}` }}
    >
      {option.label}
    </Box>
  );

  useEffect(() => {
    if (props.onChange) {
      props.onChange(
        prioritizeFromDataSource(value() ?? {}),
      );
    }
  }, [fullDataSource]);

  return (
    <MDBox position="relative">
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <MDBox
          minWidth={
            props.showCreate && props.hasPermissionToCreate
              ? 'calc(100% - 42px)'
              : '100%'
          }
          maxWidth={
            props.showCreate && props.hasPermissionToCreate
              ? 'calc(100% - 42px)'
              : '100%'
          }
        >
          <Autocomplete
            multiple={mode === 'multiple'}
            isOptionEqualToValue={(option, value) => {
              return option.value === value.value;
            }}
            disablePortal={false}
            value={value()}
            options={options()}
            onChange={(event: any, newValue: any) => {
              handleSelect(newValue);
            }}
            getOptionLabel={(option) => option.label ?? ''}
            renderOption={
              renderOption || fnDefaultRenderOption
            }
            renderInput={fnRenderInput}
            groupBy={groupBy}
            getOptionDisabled={getOptionDisabled}
            loadingText={i18n('autocomplete.loading')}
            noOptionsText={i18n('autocomplete.noOptions')}
            onBlur={() =>
              props.onBlur && props.onBlur(null)
            }
            fullWidth={fullWidth}
          />
        </MDBox>

        {props.showCreate && props.hasPermissionToCreate ? (
          <MDButton
            variant="contained"
            color="purple"
            onClick={props.onOpenModal}
            size="small"
            sx={{
              marginLeft: '16px',
              marginTop: '16px',
              marginBottom: '8px',
              flexShrink: 0,
            }}
            circular
            iconOnly
          >
            {createButtonIcon}
          </MDButton>
        ) : null}
      </MDBox>
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
    </MDBox>
  );
}

AutocompleteInMemoryFormItem.defaultProps = {
  createButtonIcon: <AddIcon />,
  isClearable: true,
  mode: 'default',
  required: false,
};

AutocompleteInMemoryFormItem.propTypes = {
  autoFocus: PropTypes.bool,
  createButtonIcon: PropTypes.element,
  externalErrorMessage: PropTypes.string,
  fetchFn: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
  getOptionDisabled: PropTypes.func,
  groupBy: PropTypes.func,
  hasPermissionToCreate: PropTypes.bool,
  hint: PropTypes.string,
  isClearable: PropTypes.bool,
  label: PropTypes.string,
  mapper: PropTypes.object.isRequired,
  margin: PropTypes.string,
  mode: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  renderInput: PropTypes.func,
  renderOption: PropTypes.func,
  required: PropTypes.bool,
  rerender: PropTypes.number,
  showCreate: PropTypes.bool,
  shrink: PropTypes.bool,
  size: PropTypes.string,
  variant: PropTypes.string,
};

export default AutocompleteInMemoryFormItem;
