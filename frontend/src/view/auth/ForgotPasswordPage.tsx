import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui material components
import Card from '@mui/material/Card';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import MDButton from 'src/mui/components/MDButton';

import { BrandLogo } from 'src/assets/resources';
import CoverLayout from 'src/view/shared/layout/CoverLayout';

// Images
const bgImage = '/images/background.svg';

const schema = yup.object().shape({
  email: yupFormSchemas.string(i18n('user.fields.email'), {
    required: true,
    max: 255,
  }),
});

function ForgotPasswordPage() {
  const dispatch = useDispatch();

  const loading = useSelector(
    selectors.selectLoadingPasswordResetEmail,
  );

  const [initialValues] = useState(() => ({ email: '' }));

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const onSubmit = async ({ email }) => {
    await dispatch(actions.doSendPasswordResetEmail(email));
    Object.keys(initialValues).forEach((key: any) => {
      form.setValue(key, initialValues[key]);
    });
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
                  name={'email'}
                  label={i18n('user.fields.email')}
                  autoComplete={'email'}
                  disabled={loading}
                  autoFocus
                />
              </MDBox>
              <MDBox mt={2} mb={1}>
                <MDButton
                  style={{ marginTop: '16px' }}
                  variant="gradient"
                  color="info"
                  type="submit"
                  fullWidth
                  disabled={loading}
                >
                  {i18n('auth.passwordResetEmail.message')}
                </MDButton>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  <MDTypography
                    component={Link}
                    to="/auth/signin"
                    underline="hover"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    {i18n('common.cancel')}
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

export default ForgotPasswordPage;
