import { Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import { useForm, FormProvider } from 'react-hook-form';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import Storage from 'src/security/storage';
import { yupResolver } from '@hookform/resolvers/yup';
import MDBox from 'src/mui/components/MDBox';
import MDInput from 'src/mui/components/MDInput';
import MDButton from 'src/mui/components/MDButton';

const schema = yup.object().shape({
  firstName: yupFormSchemas.string(
    i18n('user.fields.firstName'),
    {
      max: 80,
    },
  ),
  lastName: yupFormSchemas.string(
    i18n('user.fields.lastName'),
    {
      max: 175,
    },
  ),
  phoneNumber: yupFormSchemas.string(
    i18n('user.fields.phoneNumber'),
    {
      matches: /^[0-9]/,
      max: 24,
    },
  ),
  avatars: yupFormSchemas.images(
    i18n('user.fields.avatars'),
    {
      max: 1,
    },
  ),
});

function ProfileFormPage(props) {
  const dispatch = useDispatch();

  const saveLoading = useSelector(
    selectors.selectLoadingUpdateProfile,
  );

  const currentUser = useSelector(
    selectors.selectCurrentUser,
  );

  const [initialValues] = useState(() => {
    const record = currentUser || {};

    return {
      firstName: record.firstName,
      lastName: record.lastName,
      phoneNumber: record.phoneNumber,
      avatars: record.avatars || [],
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    dispatch(actions.doUpdateProfile(values));
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
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
        <Grid spacing={2} container>
          <Grid item lg={6} md={8} sm={12} xs={12}>
            <InputFormItem
              name="firstName"
              label={i18n('user.fields.firstName')}
              variant="standard"
              autoComplete="firstName"
              autoFocus
            />
          </Grid>
          <Grid item lg={6} md={8} sm={12} xs={12}>
            <InputFormItem
              name="lastName"
              label={i18n('user.fields.lastName')}
              variant="standard"
              autoComplete="lastName"
            />
          </Grid>
          <Grid item lg={6} md={8} sm={12} xs={12}>
            <MDInput
              id="email"
              name="email"
              label={i18n('user.fields.email')}
              value={currentUser.email}
              variant="standard"
              fullWidth
              // margin="normal"
              InputProps={{
                readOnly: true,
              }}
              // InputLabelProps={{
              //   shrink: true,
              // }}
              // variant="outlined"
              // size="small"
            />
          </Grid>
          <Grid item lg={6} md={8} sm={12} xs={12}>
            <InputFormItem
              name="phoneNumber"
              label={i18n('user.fields.phoneNumber')}
              autoComplete="phoneNumber"
              variant="standard"
              prefix="+"
            />
          </Grid>

          <Grid item lg={6} md={8} sm={12} xs={12}>
            <ImagesFormItem
              name="avatars"
              label={i18n('user.fields.avatars')}
              storage={Storage.values.userAvatarsProfiles}
              max={1}
            />
          </Grid>
        </Grid>

        <FormButtons>
          <MDButton
            variant="contained"
            color="purple"
            disabled={saveLoading}
            type="button"
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

export default ProfileFormPage;
