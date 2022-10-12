import { Card, Grid } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import { i18n } from 'src/i18n';
import StatisticsCard from 'src/view/home/StatisticsCard';
import GradientLineChart from 'src/view/home/GradientLineChart';
import DatePickerRangeFormItem from 'src/view/shared/form/items/DatePickerRangeFormItem';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import { FormProvider, useForm } from 'react-hook-form';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import SoldTable from 'src/view/home/SoldTable';

function HomePage(props) {
  const form = useForm({
    mode: 'onSubmit',
  });

  const onDuration = (values) => {
    return;
  };

  const onSold = (values) => {
    return;
  };

  return (
    <>
      <Card>
        <MDBox pt={3} pb={2} px={3}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h3">
              {i18n('home.overview')}
            </MDTypography>
            <FormWrapper>
              <FormProvider {...form}>
                <form
                  onSubmit={form.handleSubmit(onDuration)}
                >
                  <MDBox mt={2}>
                    <DatePickerRangeFormItem
                      name="Duration"
                      label="Duration"
                      size="small"
                    />
                  </MDBox>
                </form>
              </FormProvider>
            </FormWrapper>
          </MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} mt={2}>
              <MDBox mb={2}>
                <StatisticsCard
                  title={i18n('home.card1.title')}
                  count="1.5 ETH"
                  detail="~5.6K USD"
                  isValue
                />
              </MDBox>
              <StatisticsCard
                title={i18n('home.card2.title')}
                count={127}
                detail="96 this year"
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <GradientLineChart
                chart={{
                  labels: [
                    '03/2022',
                    '04/2022',
                    '05/2022',
                    '06/2022',
                  ],
                  datasets: [
                    {
                      label: 'Current Sales',
                      color: 'purple',
                      data: [1.0, 1.5, 1.7],
                      fill: true,
                      borderStyle: 'line',
                    },
                    {
                      label: 'Planned',
                      color: 'text',
                      data: [1.0, 1.5, 1.7, 2.0],
                      fill: false,
                      borderStyle: 'dotted',
                    },
                  ],
                }}
              />
            </Grid>
          </Grid>
        </MDBox>
      </Card>
      <MDBox mt={3}>
        <Card>
          <MDBox pt={3} pb={2} px={3}>
            <MDBox
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <MDTypography variant="h3">
                {i18n('home.sold')}
              </MDTypography>
              <MDBox width={140} mt={1}>
                <FormWrapper>
                  <FormProvider {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSold)}
                    >
                      <SelectFormItem
                        name="soldFilter"
                        options={['Newest', 'Recommended']}
                        size="small"
                      />
                    </form>
                  </FormProvider>
                </FormWrapper>
              </MDBox>
            </MDBox>
            <MDBox mt={2}>
              <SoldTable />
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
    </>
  );
}

export default HomePage;
