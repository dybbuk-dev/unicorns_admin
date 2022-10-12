/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// Material Dashboard 2 PRO React TS examples components
import DashboardLayout from 'src/mui/examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'src/mui/examples/Navbars/DashboardNavbar';
import Footer from 'src/mui/examples/Footer';
import DataTable from 'src/mui/examples/Tables/DataTable';

// ProductPage page components
import ProductImages from 'src/mui/layouts/ecommerce/products/product-page/components/ProductImages';
import ProductInfo from 'src/mui/layouts/ecommerce/products/product-page/components/ProductInfo';

// Data
import dataTableData from 'src/mui/layouts/ecommerce/products/product-page/data/dataTableData';

function ProductPage(): JSX.Element {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Card sx={{ overflow: 'visible' }}>
          <MDBox p={3}>
            <MDBox mb={3}>
              <MDTypography
                variant="h5"
                fontWeight="medium"
              >
                Product Details
              </MDTypography>
            </MDBox>

            <Grid container spacing={3}>
              <Grid item xs={12} lg={6} xl={5}>
                <ProductImages />
              </Grid>
              <Grid item xs={12} lg={5} sx={{ mx: 'auto' }}>
                <ProductInfo />
              </Grid>
            </Grid>

            <MDBox mt={8} mb={2}>
              <MDBox mb={1} ml={2}>
                <MDTypography
                  variant="h5"
                  fontWeight="medium"
                >
                  Other Products
                </MDTypography>
              </MDBox>
              <DataTable
                table={dataTableData}
                entriesPerPage={false}
                showTotalEntries={false}
                isSorted={false}
              />
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ProductPage;