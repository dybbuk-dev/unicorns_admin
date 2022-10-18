import React, { useState } from 'react';
import { i18n } from 'src/i18n';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import CreateBundle from 'src/view/bundle/form/components/CreateBundle';
import SelectUnicorns from 'src/view/bundle/form/components/SelectUnicorns';
import SelectLands from 'src/view/bundle/form/components/SelectLands';
import ReviewBundle from 'src/view/bundle/form/components/ReviewBundle';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MDButton from 'src/mui/components/MDButton';
import MDBox from 'src/mui/components/MDBox';
import { Card, Grid } from '@mui/material';
import Stepper from 'src/view/shared/Stepper';
import MDTypography from 'src/mui/components/MDTypography';
import colors from 'src/mui/assets/theme/base/colors';

function getSteps(): string[] {
  return [
    'createBundle',
    'selectUnicorns',
    'selectLands',
    'reviewBundle',
  ];
}

interface Bundle {
  name: string;
  expirationDate: Date;
  UNIM: number;
  RBW: number;
  unicorns: number[];
  lands: number[];
}

const validations = [
  yup.object().shape({
    name: yupFormSchemas.string(
      i18n('bundle.fields.name'),
      {
        required: true,
        max: 200,
        min: 1,
      },
    ),
    UNIM: yupFormSchemas.integer(
      i18n('bundle.fields.UNIM'),
      {
        required: true,
        min: 0,
      },
    ),
    RBW: yupFormSchemas.integer(i18n('bundle.fields.RBW'), {
      required: true,
      min: 0,
    }),
    expirationDate: yupFormSchemas.date(
      i18n('bundle.fields.expiration'),
      {
        required: true,
      },
    ),
  }),
  yup.object().shape({
    unicorn1: yupFormSchemas.boolean('unicorn1', {}),
    unicorn2: yupFormSchemas.boolean('unicorn2', {}),
    unicorn3: yupFormSchemas.boolean('unicorn3', {}),
    unicorn4: yupFormSchemas.boolean('unicorn4', {}),
    unicorn5: yupFormSchemas.boolean('unicorn5', {}),
    unicorn6: yupFormSchemas.boolean('unicorn6', {}),
    unicorn7: yupFormSchemas.boolean('unicorn7', {}),
    unicorn8: yupFormSchemas.boolean('unicorn8', {}),
    unicorn9: yupFormSchemas.boolean('unicorn9', {}),
    unicorn10: yupFormSchemas.boolean('unicorn10', {}),
  }),
  yup.object().shape({
    land1: yupFormSchemas.boolean('land1', {}),
    land2: yupFormSchemas.boolean('land2', {}),
    land3: yupFormSchemas.boolean('land3', {}),
    land4: yupFormSchemas.boolean('land4', {}),
    land5: yupFormSchemas.boolean('land5', {}),
    land6: yupFormSchemas.boolean('land6', {}),
    land7: yupFormSchemas.boolean('land7', {}),
    land8: yupFormSchemas.boolean('land8', {}),
    land9: yupFormSchemas.boolean('land9', {}),
    land10: yupFormSchemas.boolean('land10', {}),
  }),
  yup.object().shape({
    bundle: yupFormSchemas.boolean('bundle', {}),
  }),
];

function BundleForm(props) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const steps = getSteps();
  const isLastStep: boolean =
    activeStep === steps.length - 1;
  const currentValidation = validations[activeStep];

  const handleBack = () => setActiveStep(activeStep - 1);

  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      name: record.name,
      UNIM: record.UNIM,
      RBW: record.RBW,
      expirationDate: record.expirationDate,
      unicorn1: false,
      unicorn2: false,
      unicorn3: false,
      unicorn4: false,
      unicorn5: false,
      unicorn6: false,
      unicorn7: false,
      unicorn8: false,
      unicorn9: false,
      unicorn10: false,
      land1: false,
      land2: false,
      land3: false,
      land4: false,
      land5: false,
      land6: false,
      land7: false,
      land8: false,
      land9: false,
      land10: false,
    };
  });

  const [values, setValues] = useState<any>(initialValues);

  const form = useForm({
    resolver: yupResolver(currentValidation),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const onSubmit = (values) => {
    if (isLastStep) {
      let bundle: Bundle = {
        name: values.name,
        expirationDate: values.expirationDate,
        UNIM: values.UNIM,
        RBW: values.RBW,
        unicorns: [],
        lands: [],
      };
      for (let i = 0; i < 10; i++) {
        if (eval(`values.unicorn${i + 1}`))
          bundle.unicorns.push(i);
        if (eval(`values.land${i + 1}`))
          bundle.lands.push(i);
      }
      props.onSubmit(props.record?.id, bundle);
    } else {
      setValues(values);
      setActiveStep(activeStep + 1);
    }
  };

  const { saveLoading, title, modal } = props;

  const makeFormButtons = () => {
    return (
      <MDBox
        position="relative"
        display="flex"
        py={2}
        justifyContent="space-between"
        alignItems="center"
      >
        {activeStep === 0 ? (
          <MDBox>
            <MDTypography
              sx={{
                color: colors.dark.main,
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              {i18n('bundle.create.balance')}
            </MDTypography>
            <MDBox display="flex">
              <MDBox
                display="flex"
                sx={{
                  borderRight: 1,
                  borderColor: 'grey.400',
                  pr: '12px',
                }}
              >
                <img
                  src="/images/tokens/UNIM.svg"
                  width="20px"
                  alt="UNIM"
                />
                <MDTypography
                  sx={{
                    ml: '4px',
                    color: colors.dark.main,
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                >
                  8000 UNIM
                </MDTypography>
              </MDBox>
              <MDBox display="flex" pl="12px">
                <img
                  src="/images/tokens/RBW.svg"
                  width="20px"
                  alt="RBW"
                />
                <MDTypography
                  sx={{
                    ml: '4px',
                    color: colors.dark.main,
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                >
                  6000 RBW
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        ) : (
          <MDButton
            variant="outlined"
            color="purple"
            disabled={saveLoading}
            onClick={handleBack}
            startIcon={<ArrowBackIosIcon />}
            size="small"
            circular
          >
            {i18n('common.previous')}
          </MDButton>
        )}

        <Stepper activeStep={activeStep} length={4} />

        {isLastStep ? (
          <MDButton
            variant="gradient"
            color="purple"
            disabled={saveLoading}
            type="submit"
            onSubmit={form.handleSubmit(onSubmit)}
            size="small"
            circular
          >
            {i18n('common.publish')}
          </MDButton>
        ) : (
          <MDButton
            variant="gradient"
            color="purple"
            disabled={saveLoading}
            type="submit"
            endIcon={<ArrowForwardIosIcon />}
            size="small"
            circular
          >
            {i18n('common.continue')}
          </MDButton>
        )}
      </MDBox>
    );
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
          noValidate
        >
          {modal ? (
            <>
              <CreateBundle title={title} />
              <MDBox px={1}>{makeFormButtons()}</MDBox>
            </>
          ) : (
            <Grid
              container
              spacing={2}
              justifyContent="center"
              mt={1}
            >
              <Grid item md={10} sm={12} xs={12}>
                <Card>
                  <MDBox px={3}>
                    <CreateBundle
                      visible={activeStep === 0}
                    />
                    <SelectUnicorns
                      visible={activeStep === 1}
                    />
                    <SelectLands
                      visible={activeStep === 2}
                    />
                    <ReviewBundle
                      visible={isLastStep}
                      values={values}
                    />
                    <MDBox px={1}>
                      {makeFormButtons()}
                    </MDBox>
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          )}
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default BundleForm;
