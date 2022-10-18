import ReactDOM from 'react-dom';
import { Dialog, DialogTitle } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import { CircularProgress } from '@mui/material';

function SpinnerModal(props) {
  return ReactDOM.createPortal(
    <Dialog open={true} maxWidth="sm" fullWidth={true}>
      <MDBox position="relative" pt="120px">
        <MDBox
          position="absolute"
          width="80px"
          left="50%"
          top="30px"
          ml="-40px"
        >
          <img
            src="/images/tokens/RBW.svg"
            width="100%"
            alt="RBW"
          />
        </MDBox>
        <CircularProgress
          thickness={3.5}
          size={90}
          sx={{
            position: 'absolute',
            left: '50%',
            top: '25px',
            ml: '-45px',
            color: 'rgba(96, 41, 227, 0.8)',
          }}
        />
      </MDBox>
      <MDTypography
        sx={{
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '36px',
        }}
      >
        Sync in Progress
      </MDTypography>
      <MDTypography
        sx={{
          pt: '10px',
          pb: '20px',
          textAlign: 'center',
          fontWeight: 400,
          fontSize: '20px',
          fontColor: 'grey.400',
        }}
      >
        Please wait until operations is finished...
      </MDTypography>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default SpinnerModal;
