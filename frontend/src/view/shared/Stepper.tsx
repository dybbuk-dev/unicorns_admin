import MDTypography from 'src/mui/components/MDTypography';
import MDBox from 'src/mui/components/MDBox';

export default function Stepper(props) {
  const { activeStep } = props;
  const colors = ['light', 'light', 'light', 'light'];
  colors[activeStep] = 'purple';
  return (
    <MDBox
      maxWidth="100px"
      position="absolute"
      top={2}
      left="50%"
      marginTop="10px"
      marginLeft="-50px"
    >
      <MDTypography
        sx={{
          fontSize: '16px',
          color: 'grey.600',
          pb: 1,
        }}
      >
        {`Step ${activeStep + 1} of 4`}
      </MDTypography>
      <MDBox display="flex" justifyContent="space-between">
        {colors.map((color, index) => (
          <MDBox
            key={index}
            bgcolor={color}
            borderRadius="50%"
            width="10px"
            height="10px"
          />
        ))}
      </MDBox>
    </MDBox>
  );
}
