import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui material components
import Card from '@mui/material/Card';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import MDButton from 'src/mui/components/MDButton';

import { BrandLogo } from 'src/assets/resources';
import CoverLayout from 'src/mui/layouts/authentication/components/CoverLayout';

// Images
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
});

function SignupPage(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();

  const loading = useSelector(selectors.selectLoading);

  const externalErrorMessage = useSelector(
    selectors.selectErrorMessage,
  );

  const emailFromInvitation = queryString.parse(
    location.search,
  ).email;

  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  const [initialValues] = useState({
    email: emailFromInvitation || '',
    password: '',
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const onSubmit = ({ email, password }) => {
    dispatch(
      actions.doRegisterEmailAndPassword(email, password),
    );
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgcolor="white"
          borderRadius="lg"
          coloredShadow="success"
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
              <MDBox mt={4} mb={1}>
                <MDButton
                  type="submit"
                  variant="gradient"
                  color="info"
                  disabled={loading}
                  fullWidth
                >
                  {i18n('auth.signup')}
                </MDButton>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  <MDTypography
                    component={Link}
                    to="/auth/signin"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    {i18n('auth.alreadyHaveAnAccount')}
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

export default SignupPage;
