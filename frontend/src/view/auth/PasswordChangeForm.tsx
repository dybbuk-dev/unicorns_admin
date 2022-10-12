import { Button, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import { useForm, FormProvider } from 'react-hook-form';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';

const schema = yup.object().shape({
  oldPassword: yupFormSchemas.string(
    i18n('user.fields.oldPassword'),
    {
      required: true,
    },
  ),
  newPassword: yupFormSchemas.string(
    i18n('user.fields.newPassword'),
    {
      required: true,
    },
  ),
  newPasswordConfirmation: yupFormSchemas
    .string(i18n('user.fields.newPasswordConfirmation'), {
      required: true,
    })
    .oneOf(
      [yup.ref('newPassword'), null],
      i18n('auth.passwordChange.mustMatch'),
    ),
});

function PasswordChangeFormPage(props) {
  const dispatch = useDispatch();

  const [initialValues] = useState(() => ({
    oldPassword: '',
    newPassword: '',
    newPasswordConfirmation: '',
  }));

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const saveLoading = useSelector(
    selectors.selectLoadingPasswordChange,
  );

  const onSubmit = (values) => {
    dispatch(
      actions.doChangePassword(
        values.oldPassword,
        values.newPassword,
      ),
    );
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key: any) => {
      form.setValue(key, initialValues[key]);
    });
  };

  return (
    <FormProvider {...form}>
      <MDBox
        component="form"
        pb={3}
        px={3}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Grid container spacing={3}>
          <Grid item lg={7} md={8} sm={12} xs={12}>
            <InputFormItem
              type="password"
              name="oldPassword"
              label={i18n('user.fields.oldPassword')}
              variant="standard"
              autoComplete="old-password"
              autoFocus
              required
            />
          </Grid>
          <Grid item lg={7} md={8} sm={12} xs={12}>
            <InputFormItem
              type="password"
              name="newPassword"
              label={i18n('user.fields.newPassword')}
              variant="standard"
              autoComplete="new-password"
              required
            />
          </Grid>
          <Grid item lg={7} md={8} sm={12} xs={12}>
            <InputFormItem
              type="password"
              name="newPasswordConfirmation"
              variant="standard"
              label={i18n(
                'user.fields.newPasswordConfirmation',
              )}
              autoComplete="new-password"
              required
            />
          </Grid>
        </Grid>

        <FormButtons>
          <MDButton
            variant="gradient"
            color="purple"
            disabled={saveLoading}
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            startIcon={<SaveIcon />}
            size="small"
            circular
          >
            {i18n('common.save')}
          </MDButton>

          <MDButton
            variant="outlined"
            color="purple"
            disabled={saveLoading}
            onClick={onReset}
            type="button"
            startIcon={<UndoIcon />}
            size="small"
            circular
          >
            {i18n('common.reset')}
          </MDButton>

          {props.onCancel ? (
            <MDButton
              variant="outlined"
              color="purple"
              disabled={saveLoading}
              onClick={() => props.onCancel()}
              type="button"
              startIcon={<CloseIcon />}
              size="small"
              circular
            >
              {i18n('common.cancel')}
            </MDButton>
          ) : null}
        </FormButtons>
      </MDBox>
    </FormProvider>
  );
}

export default PasswordChangeFormPage;
