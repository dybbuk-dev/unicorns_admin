import { ReactNode } from 'react';

// @mui material components
import Grid from '@mui/material/Grid';
import { Theme } from '@mui/material/styles';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';

// Material Dashboard 2 PRO React TS examples components
import PageLayout from 'src/view/shared/layout/PageLayout';

// Declaring props types for CoverLayout
interface Props {
  coverHeight?: string;
  image: string;
  children: ReactNode;
}

function CoverLayout({
  coverHeight,
  image,
  children,
}: Props): JSX.Element {
  return (
    <PageLayout>
      <MDBox
        width="calc(100% - 2rem)"
        minHeight={coverHeight}
        borderRadius="xl"
        mx={2}
        my={2}
        pt={6}
        pb={28}
        sx={{
          backgroundImage: ({
            functions: { linearGradient, rgba },
            palette: { gradients },
          }: Theme) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.1),
              rgba(gradients.dark.state, 0.1),
            )}, url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <MDBox
        mt={{ xs: -20, lg: -18 }}
        px={1}
        width="calc(100% - 2rem)"
        mx="auto"
      >
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </MDBox>
    </PageLayout>
  );
}

// Declaring default props for CoverLayout
CoverLayout.defaultProps = {
  coverHeight: '35vh',
};

export default CoverLayout;
