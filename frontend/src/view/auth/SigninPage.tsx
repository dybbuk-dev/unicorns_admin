import { useForm, FormProvider } from 'react-hook-form';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import { i18n } from 'src/i18n';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import queryString from 'query-string';
import Message from 'src/view/shared/message';

// @mui material components
import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import MDButton from 'src/mui/components/MDButton';

// Authentication layout components
import CoverLayout from 'src/view/shared/layout/CoverLayout';

import { FormControlLabel } from '@mui/material';
import { BrandLogo } from 'src/assets/resources';

const bgImage = '/images/background.svg';

const schema = yup.object().shape({
  email: yupFormSchemas.string(i18n('user.fields.email'), {
    required: true,
  }),
  password: yupFormSchemas.string(
    i18n('user.fields.password'),
    {
      required: true,
    },
  ),
  rememberMe: yupFormSchemas.boolean(
    i18n('user.fields.rememberMe'),
  ),
});

function SigninPage(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();

  const { socialErrorCode } = queryString.parse(
    location.search,
  );

  const loading = useSelector(selectors.selectLoading);

  const externalErrorMessage = useSelector(
    selectors.selectErrorMessage,
  );

  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  useEffect(() => {
    if (socialErrorCode) {
      if (socialErrorCode === 'generic') {
        Message.error(i18n('errors.defaultErrorMessage'));
      } else {
        Message.error(
          i18n(`auth.social.errors.${socialErrorCode}`),
        );
      }
    }
  }, []);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  });

  const onSubmit = (values) => {
    dispatch(
      actions.doSigninWithEmailAndPassword(
        values.email,
        values.password,
        values.rememberMe,
      ),
    );
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgcolor="white"
          borderRadius="lg"
          coloredShadow="info"
          mx={4}
          mt={-3}
          mb={4}
          textAlign="center"
        >
          <MDBox
            display="flex"
            justifyContent="center"
            py={2}
          >
            <BrandLogo width="80%" />
          </MDBox>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <FormProvider {...form}>
            <MDBox
              component="form"
              role="form"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <MDBox mb={2}>
                <InputFormItem
                  name="email"
                  label={i18n('user.fields.email')}
                  autoComplete="email"
                  externalErrorMessage={
                    externalErrorMessage
                  }
                  autoFocus
                />
              </MDBox>
              <MDBox mb={2}>
                <InputFormItem
                  name="password"
                  label={i18n('user.fields.password')}
                  autoComplete="password"
                  type="password"
                />
              </MDBox>
              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <FormControlLabel
                  control={
                    <Switch
                      id={'rememberMe'}
                      name={'rememberMe'}
                      defaultChecked={true}
                      inputRef={form.register}
                      color={'info'}
                    />
                  }
                  label={i18n('user.fields.rememberMe')}
                />
                <MDTypography variant="button" color="text">
                  <MDTypography
                    component={Link}
                    variant="button"
                    color="info"
                    to="/auth/forgot-password"
                    fontWeight="medium"
                    textGradient
                  >
                    {i18n('auth.forgotPassword')}
                  </MDTypography>
                </MDTypography>
              </MDBox>
              <MDBox mt={3} mb={1}>
                <MDButton
                  type="submit"
                  variant="gradient"
                  color="info"
                  fullWidth
                  disabled={loading}
                >
                  {i18n('auth.signin')}
                </MDButton>
              </MDBox>
              <MDBox mt={3} textAlign="center">
                <MDTypography variant="button" color="text">
                  <MDTypography
                    component={Link}
                    to="/auth/signup"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    {i18n('auth.createAnAccount')}
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </FormProvider>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default SigninPage;
